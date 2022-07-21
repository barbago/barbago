import { Router } from 'express';

import { reviewRouter, userRouter, vendorRouter } from './features';

export const router = Router();

router.use('/users', userRouter);
router.use('/vendors', vendorRouter);
router.use('/vendors/:uid/reviews', reviewRouter);

/**
 * @apiDefine BearerAuth
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} [Authorization="Bearer "] Bearer token from Firebase Auth
 * @apiHeaderExample {json} Authorization Example:
 * {
 *   "Authorization": "Bearer ey.firebaseIdToken"
 * }
 */

/**
 * @apiDefine IsCurrentUser
 * @apiVersion 1.0.0
 * 
 * @apiPermission Current User
 * @apiUse BearerAuth
 * @apiUse UnauthorizedError
 */

/**
 * @apiDefine IsLoggedIn
 * @apiVersion 1.0.0
 * 
 * @apiPermission Authenticated
 * @apiUse BearerAuth
 * @apiUse UnauthorizedError
 */

/**
 * @apiDefine IsAdmin
 * @apiVersion 1.0.0
 * 
 * @apiPermission Admin
 * @apiUse BearerAuth
 * @apiUse UnauthorizedError
 * @apiUse ForbiddenError
 */

/**
 * @apiDefine UserSuccess
 *
 * @apiSuccess {User} user
 * @apiSuccess {String} user.uid        Firebase User ID
 * @apiSuccess {String} [user.name]     User's full display name
 * @apiSuccess {String} [user.email]    User email address
 * @apiSuccess {String} [user.phone]    User phone number
 * @apiSuccess {String} [user.photo]    Profile Picture URL
 * @apiSuccessExample {json} Success response:
 * HTTPS 200 OK
 * {
 *   "uid": "hLvATvjgoKSybSXpjqBk2REj4Ak2",
 *   "name": "Barbago Barber",
 *   "email": "help@barbago.app",
 *   "phone": null,
 *   "photo": "https://lh3.googleusercontent.com/a-/AFdZucoRfEhCxKx1sloO7rsDKcjh32gumSiKOIgrQxuy=s96-c",
 * }
 */

/**
 * @apiDefine UsersSuccess
 * @apiSuccess {Object[]} users
 * @apiSuccess {String} users.uid
 * @apiSuccess {String} [users.name]
 * @apiSuccess {String} [users.email]
 * @apiSuccessExample {json} Success response:
 * HTTPS 200 OK
 * [
 *   {
 *     "uid": "hLvATvjgoKSybSXpjqBk2REj4Ak2",
 *     "name": "Barbago Barber",
 *     "email": "help@barbago.app",
 *     "phone": null,
 *     "photo": "https://lh3.googleusercontent.com/a-/AFdZucoRfEhCxKx1sloO7rsDKcjh32gumSiKOIgrQxuy=s96-c",
 *   }
 * ]
 */

/**
 * @apiDefine BadRequestError
 * @apiVersion 1.0.0
 *
 * @apiError BadRequest Request must be sent with valid parameters
 * @apiErrorExample BadRequest response:
 * Error 400: Bad Request
 * {
 *   "status": 400,
 *   "message": "Bad Request"
 * }
 */

/**
 * @apiDefine UnauthorizedError
 * @apiVersion 1.0.0
 *
 * @apiError Unauthorized Only authenticated users can access the endpoint.
 * @apiErrorExample  Unauthorized response:
 * Error 401: Unauthorized
 * {
 *   "status": 401,
 *   "message": "Unauthorized"
 * }
 */

/**
 * @apiDefine ForbiddenError
 * @apiVersion 1.0.0
 *
 * @apiError Forbidden Only users with access to this resource may access the endpoint
 * @apiErrorExample Forbidden response:
 * Error 403: Forbidden
 * {
 *   "status": 403,
 *   "message": "Forbidden"
 * }
 */

/**
 * @apiDefine NotFoundError
 * @apiVersion 1.0.0
 *
 * @apiError NotFound There is no resource at this endpoint
 * @apiErrorExample NotFound response:
 * Error 404: Not Found
 * {
 *   "status": 404,
 *   "message": "Not Found"
 * }
 */

/**
 * @apiDefine ConflictError
 * @apiVersion 1.0.0
 *
 * @apiError Conflict There is already a resource at this endpoint
 * @apiErrorExample Conflict response:
 * Error 409: Conflict
 * {
 *   "status": 409,
 *   "message": "Conflict"
 * }
 */
