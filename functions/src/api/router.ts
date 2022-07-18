import { Router } from 'express';

import { reviewRouter, userRouter, vendorRouter } from './features';

export const router = Router();

router.use('/user', userRouter);
router.use('/vendor', vendorRouter);
router.use('/vendor/:uid/review', reviewRouter);

/**
 * @apiDefine BearerAuth
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} [Authorization="Bearer "] Bearer token from Firebase Auth
 * @apiHeaderExample {json} Authorization Example:
 * {
 *   "Authorization": "Bearer ey.token-from-firebase-auth"
 * }
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
