import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { UserRecord } from 'firebase-functions/v1/auth';
import httpError from 'http-errors';

import { isAuthenticated } from '../../middlewares';
import * as chatService from './chat.service';
import * as userService from '../user/user.service';

export const chatRouter = Router();

/**
 * @api {post} /chats/:chatId/ Add message to a chat
 * @apiBody {String} text Message text content
 *
 * @apiGroup Chats
 * @apiName addMessageToChat
 * @apiVersion 1.0.0
 *
 * @apiUse IsMember
 */
chatRouter.post(
  '/:chatId',
  isAuthenticated,
  asyncHandler(async (req, res) => {
    const { uid } = req['user'] as UserRecord;
    const { chatId } = req.params;
    const { text } = req.body;

    if (!text || typeof text !== 'string')
      throw httpError(400, 'text is a required string');

    const chat = await chatService.getChatById(chatId);

    if (!chat) throw httpError(404, 'Chat not found');
    if (!chat.members.includes(uid))
      throw httpError(403, 'You may not access this chat');

    const message = await chatService.createMessage(chatId, uid, text);

    res.json(message);
  }),
);

/**
 * @api {get} /chats/:chatId Get chat messages
 *
 * @apiGroup Chats
 * @apiName getChatMessages
 * @apiVersion 1.0.0
 *
 * @apiUse IsMember
 */
chatRouter.get(
  '/:chatId',
  isAuthenticated,
  asyncHandler(async (req, res) => {
    res.json(await chatService.getMessagesFromChat(req.params.chatId));
  }),
);

/**
 * @api {get} /chats Get chats for current user
 *
 * @apiGroup Chats
 * @apiName getCurrentUserChats
 * @apiVersion 1.0.0
 *
 * @apiUse IsCurrentUser
 */
chatRouter.get(
  '/',
  isAuthenticated,
  asyncHandler(async (req, res) => {
    const { uid } = req['user'] as UserRecord;

    const chats = await chatService.getChatsByUid(uid);

    res.json(chats);
  }),
);

/**
 * @api {post} /chats Create chat
 * @apiBody {String} recipient Firebase User ID of the recipient
 *
 * @apiGroup Chats
 * @apiName createChat
 * @apiVersion 1.0.0
 *
 * @apiUse IsLoggedIn
 */
chatRouter.post(
  '/',
  isAuthenticated,
  asyncHandler(async (req, res) => {
    const { uid } = req['user'] as UserRecord;
    const { recipient } = req.body;

    const members = await Promise.all(
      [uid, recipient]
        .sort()
        .map(async (id) => userService.getUserByUid(id)),
    );

    const chat = await chatService.createChat(members);

    res.json(chat);
  }),
);
