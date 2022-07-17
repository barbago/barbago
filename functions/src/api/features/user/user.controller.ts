import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { UserRecord } from 'firebase-functions/v1/auth';
import httpError from 'http-errors';

import { userService } from '.';
import { isAuthenticated, isRoleAdmin } from '../../middlewares';

export const userRouter = Router();

/**
 * @api {post} /user/ Create a new user
 * @apiBody {String} name
 * @apiBody {String} email
 *
 * @apiGroup Users
 * @apiName createUser
 * @apiVersion 1.0.0
 * @apiPermission Authenticated
 *
 * @apiUse BearerAuth
 * @apiUse UnauthorizedError
 */
userRouter.post(
  '/',
  isAuthenticated,
  asyncHandler(async (req, res) => {
    // todo: take given, then firebase, then default params
    // allow optional image_url, phone, settings

    let { uid, displayName: name, email } = req['user'] as UserRecord;

    if (!uid || !email || !name) throw httpError(400);

    const user = await userService.createUser(uid, email, name);
    await userService.createClient(user);
    res.json(user);
  }),
);

/**
 * @api {delete} /user/ Delete current user
 *
 * @apiGroup Users
 * @apiName deleteCurrentUser
 * @apiVersion 1.0.0
 * @apiPermission Current User
 *
 * @apiUse BearerAuth
 * @apiUse UnauthorizedError
 * @apiUse NotFoundError
 */
userRouter.delete(
  '/',
  isAuthenticated,
  asyncHandler(async (req, res) => {}),
);

/**
 * @api {delete} /user/:uid Delete one user by uid
 * @apiParam {String} uid Firebase UID
 *
 * @apiGroup Users
 * @apiName deleteUserByUid
 * @apiVersion 1.0.0
 * @apiPermission Admin
 *
 * @apiUse BearerAuth
 * @apiUse UnauthorizedError
 * @apiUse ForbiddenError
 * @apiUse NotFoundError
 */
userRouter.delete(
  '/:uid',
  isRoleAdmin,
  asyncHandler(async (req, res) => {}),
);

/**
 * @api {get} /user/all Get all users
 * @apiQuery {Number} [offset=0] Starting item number
 * @apiQuery {Number} [limit=20] Number of items returned, max 20
 *
 * @apiGroup Users
 * @apiName getAllUsers
 * @apiVersion 1.0.0
 * @apiPermission Admin
 *
 * @apiSuccess {Object[]} users
 * @apiSuccess {String} users.uid
 * @apiSuccess {String} [users.name]
 * @apiSuccess {String} [users.email]
 * @apiSuccessExample {json} Success response:
 * HTTPS 200 OK
 * [
 *   {
 *     "uid": "aaaaaaaaa",
 *     "name": "aaaaaaaaa",
 *     "email": "aa@aa.aa"
 *   }
 * ]
 *
 * @apiUse BearerAuth
 * @apiUse UnauthorizedError
 * @apiUse ForbiddenError
 */
userRouter.get(
  '/all',
  isRoleAdmin,
  asyncHandler(async (req, res) => {}),
);

/**
 * @api {get} /user Get current user
 *
 * @apiGroup Users
 * @apiName getCurrentUser
 * @apiVersion 1.0.0
 *
 * @apiSuccess {User} user
 * @apiSuccess {String} user.uid
 * @apiSuccess {String} user.name
 * @apiSuccess {String} user.email
 * @apiSuccessExample {json} Success response:
 * HTTPS 200 OK
 * {
 *   "uid": "aaaaaa"
 *   "name": "aaaaaaa"
 *   "email": "aa@aa.aa"
 * }
 *
 * @apiUse BearerAuth
 * @apiUse UnauthorizedError
 */
userRouter.get(
  '/',
  asyncHandler(async (req, res) => {}),
);

/**
 * @api {get} /user/:uid Get one user by its uid
 * @apiParam {String} uid User ID
 *
 * @apiGroup Users
 * @apiName getUserByName
 * @apiVersion 1.0.0
 * @apiPermission Admin
 *
 * @apiUse BearerAuth
 * @apiUse UnauthorizedError
 * @apiUse ForbiddenError
 */
userRouter.get(
  '/:uid',
  isRoleAdmin,
  asyncHandler(async (req, res) => {}),
);

/**
 * @api {put} /user/ Update current user
 * @apiBody {String} name
 * @apiBody {String} email
 *
 * @apiGroup Users
 * @apiName updateCurrentUser
 * @apiVersion 1.0.0
 *
 * @apiUse BearerAuth
 * @apiUse UnauthorizedError
 * @apiUse NotFoundError
 */
userRouter.put(
  '/',
  isAuthenticated,
  asyncHandler(async (req, res) => {}),
);

/**
 * @api {put} /user/:uid Update one user by id
 * @apiBody {String} name
 * @apiBody {String} email
 *
 * @apiGroup Users
 * @apiName updateOneUser
 * @apiVersion 1.0.0
 *
 * @apiUse BearerAuth
 * @apiUse UnauthorizedError
 * @apiUse ForbiddenError
 * @apiUse NotFoundError
 */
userRouter.put(
  '/:uid',
  isRoleAdmin,
  asyncHandler(async (req, res) => {}),
);
