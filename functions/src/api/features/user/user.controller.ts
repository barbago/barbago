import { Router } from 'express';

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
userRouter.post('/', isAuthenticated, (req, res) => {});

/**
 * @api {delete} /user/ Delete current user
 *
 * @apiGroup Users
 * @apiName deleteCurrentUser
 * @apiVersion 1.0.0
 * @apiPermission Current User
 *
 * @apiUse BearerAuth
 * @apiError UnauthorizedError
 * @apiError NotFoundError
 */
userRouter.delete('/', isAuthenticated, (req, res) => {});

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
userRouter.delete('/:uid', isRoleAdmin, (req, res) => {});

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
userRouter.get('/all', isRoleAdmin, (req, res) => {});

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
userRouter.get('/', (req, res) => {});

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
userRouter.get('/:uid', isRoleAdmin, (req, res) => {});

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
userRouter.put('/', isAuthenticated, (req, res) => {});

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
userRouter.put('/:uid', isRoleAdmin, (req, res) => {});
