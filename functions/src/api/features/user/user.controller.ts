import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { UserRecord } from 'firebase-functions/v1/auth';
import httpError from 'http-errors';

import { isAuthenticated, isRoleAdmin } from '../../middlewares';
import * as userService from './user.service';

export const userRouter = Router();

/**
 * @api {post} /users/ Create a new user
 * @apiBody {String} name
 * @apiBody {String} email
 *
 * @apiGroup Users
 * @apiName createUser
 * @apiVersion 1.0.0
 *
 * @apiUse UserSuccess
 * @apiUse IsLoggedIn
 * @apiUse ConflictError
 */
userRouter.post(
  '/',
  isAuthenticated,
  asyncHandler(async (req, res) => {
    const { uid } = req['user'] as UserRecord;
    const { name, email, phone, photo } = req.body;

    if (!name || !email) throw httpError(400);

    if (await userService.getUserByUid(uid))
      throw httpError(409, 'User already exists');

    const params = { uid, name, email, phone, photo };

    await userService.createUser(uid, params);

    res.json(params);
  }),
);

/**
 * @api {delete} /users/ Delete current user
 *
 * @apiGroup Users
 * @apiName deleteCurrentUser
 * @apiVersion 1.0.0
 *
 * @apiUse IsCurrentUser
 * @apiUse UserSuccess
 * @apiUse NotFoundError
 */
userRouter.delete(
  '/',
  isAuthenticated,
  asyncHandler(async (req, res) => {
    const { uid } = req['user'] as UserRecord;

    const user = await userService.getUserByUid(uid);

    if (!user) throw httpError(404, 'User not found');

    await userService.deleteUser(uid);

    res.json(user);
  }),
);

/**
 * @api {delete} /users/:uid Delete one user by uid
 * @apiParam {String} uid Firebase User ID
 *
 * @apiGroup Users
 * @apiName deleteUserByUid
 * @apiVersion 1.0.0
 *
 * @apiUse UserSuccess
 * @apiUse IsAdmin
 * @apiUse NotFoundError
 */
userRouter.delete(
  '/:uid',
  isRoleAdmin,
  asyncHandler(async (req, res) => {
    const { uid } = req.params;

    const user = await userService.getUserByUid(uid);

    if (!user) throw httpError(404, 'User not found');

    await userService.deleteUser(uid);

    res.json(user);
  }),
);

/**
 * @api {get} /users/all Get all users
 * 
 * @apiGroup Users
 * @apiName getAllUsers
 * @apiVersion 1.0.0
 *
 * @apiUse IsAdmin
 */
userRouter.get(
  '/all',
  isRoleAdmin,
  asyncHandler(async (req, res) => {}),
);

/**
 * @api {get} /users Get current user
 *
 * @apiGroup Users
 * @apiName getCurrentUser
 * @apiVersion 1.0.0
 *
 * @apiUse IsCurrentUser
 * @apiUse UserSuccess
 * @apiUse NotFoundError
 */
userRouter.get(
  '/',
  isAuthenticated,
  asyncHandler(async (req, res) => {
    const { uid } = req['user'] as UserRecord;

    const user = await userService.getUserByUid(uid);

    if (!user) throw httpError(404, 'User not found');

    res.json(user);
  }),
);

/**
 * @api {get} /users/:uid Get one user by its uid
 * @apiParam {String} uid User ID
 *
 * @apiGroup Users
 * @apiName getUserByName
 * @apiVersion 1.0.0
 *
 * @apiUse UserSuccess
 * @apiUse IsAdmin
 * @apiUse NotFoundError
 */
userRouter.get(
  '/:uid',
  isRoleAdmin,
  asyncHandler(async (req, res) => {
    const { uid } = req.params;

    const user = await userService.getUserByUid(uid);

    if (!user) throw httpError(404, 'User not found');

    res.json(user);
  }),
);

/**
 * @api {put} /users/ Update current user
 * @apiBody {String} name
 * @apiBody {String} email
 *
 * @apiGroup Users
 * @apiName updateCurrentUser
 * @apiVersion 1.0.0
 *
 * @apiUse IsCurrentUser
 * @apiUse UserSuccess
 * @apiUse NotFoundError
 */
userRouter.put(
  '/',
  isAuthenticated,
  asyncHandler(async (req, res) => {
    const { uid } = req['user'] as UserRecord;
    const { name, email, phone, photo } = req.body;

    if (!(await userService.getUserByUid(uid)))
      throw httpError(404, 'User not found');

    const params = { uid, name, email, phone, photo };

    const user = await userService.updateUser(uid, params);

    res.json(user);
  }),
);

/**
 * @api {put} /users/:uid Update one user by id
 * @apiBody {String} name
 * @apiBody {String} email
 *
 * @apiGroup Users
 * @apiName updateOneUser
 * @apiVersion 1.0.0
 *
 * @apiUse UserSuccess
 * @apiUse IsAdmin
 * @apiUse NotFoundError
 */
userRouter.put(
  '/:uid',
  isRoleAdmin,
  asyncHandler(async (req, res) => {
    const { uid } = req.params;
    const { name, email, phone, photo } = req.body;

    if (!(await userService.getUserByUid(uid)))
      throw httpError(404, 'User not found');

    const params = { uid, name, email, phone, photo };

    const user = await userService.updateUser(uid, params);

    res.json(user);
  }),
);
