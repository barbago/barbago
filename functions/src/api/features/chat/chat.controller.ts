import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { UserRecord } from 'firebase-functions/v1/auth';
import httpError from 'http-errors';

import { isAuthenticated } from '../../middlewares';
import { userService } from '../user';
import * as chatService from './chat.service';

export const chatRouter = Router();

/**
 * @api {post} /chats/:chatId/ Add message to a chat
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

    await chatService.createMessage(chatId, uid, text);

    res.json();
  }),
);

/**
 * @api {get} /chats/:chatId
 */
chatRouter.get(
  '/:chatId',
  isAuthenticated,
  asyncHandler(async (req, res) => {
    res.json(await chatService.getMessagesFromChat(req.params.chatId));
  }),
);

/**
 * @api {get} /chats Get current user's chats
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
 */
chatRouter.post(
  '/',
  isAuthenticated,
  asyncHandler(async (req, res) => {
    const { uid } = req['user'] as UserRecord;
    const { recipients } = req.body;

    const members = await Promise.all(
      [uid, ...recipients].map(async (id) =>
        userService.getUserByUid(id),
      ),
    );

    console.log(members);

    await chatService.createChat();

    res.json();
  }),
);
