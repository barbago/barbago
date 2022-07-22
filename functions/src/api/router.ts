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
 *
 * @apiSuccess {User[]} users
 * @apiSuccess {String} users.uid        Firebase User ID
 * @apiSuccess {String} [users.name]     User's full display name
 * @apiSuccess {String} [users.email]    User email address
 * @apiSuccess {String} [users.phone]    User phone number
 * @apiSuccess {String} [users.photo]    Profile Picture URL
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
 * @apiDefine VendorSuccess
 * 
 * @apiSuccess {Vendor} vendor
 * @apiSuccess {String} vendor.uid  Vendor's Firebase User ID
 * @apiSuccess {String} vendor.name Vendor's profile name
 * @apiSuccess {String} vendor.link Unique text link for navigation
 * @apiSuccess {Number} vendor.latitude   Vendor profile's latitude
 * @apiSuccess {Number} vendor.longitude  Vendor profile's longitude
 * @apiSuccess {String} vendor.geohash    Used to query by distance
 * @apiSuccess {String} [vendor.location] Human-friendly text string
 * @apiSuccessExample {json} Success Response
 * HTTPS 200 OK
 * {
 *   "rating": 5,
 *   "name": "Barbago User",
 *   "avatar": "https://lh3.googleusercontent.com/a-/AOh14GiI1O3i5ADBISlcfU5ueNTWkOmvKc9Y_YtkuQOUddo=s96-c",
 *   "authorId": "hLvATvjgoKSybSXpjqBk2REj4Ak2",
 *   "vendorId": "hLvATvjgoKSybSXpjqBk2REj4Ak2",
 *   "text": "I am this barber and I rate myself 5 stars"
 * }
 */

/**
 * @apiDefine VendorsSuccess
 *
 * @apiSuccess {Vendor[]} vendors
 * @apiSuccess {String} vendors.uid  Vendor's Firebase User ID
 * @apiSuccess {String} vendors.name Vendor's profile name
 * @apiSuccess {String} vendors.link Unique text link for navigation
 * @apiSuccess {Number} vendors.latitude  Vendor profile's latitude
 * @apiSuccess {Number} vendors.longitude Vendor profile's longitude
 * @apiSuccess {String} vendors.geohash   Used to query by distance
 * @apiSuccess {String} [vendor.location] Human-friendly text string
 * @apiSuccessExample {json} Success Response
 * HTTPS 200 OK
 * [
 *   {
 *     "link": "hecking-barber-shop",
 *     "uid": "nfa18QtOljWpoaSDs7or7isI6xg1",
 *     "name": "Hecking Barber",
 *     "geohash": "dq2htmyyp7",
 *     "latitude": 35.9799,
 *     "location": "Wake Forest, NC",
 *     "longitude": -78.5097
 *   }
 * ]
 */



/**
 * @apiDefine ReviewSuccess
 *
 * @apiSuccess {Review} review
 * @apiSuccess {String} review.vendorId Firebase UID of the reviewed vendor
 * @apiSuccess {String} review.authorId Firebase UID of the reviewer
 * @apiSuccess {Number} review.rating Number of stars, integer 1-5
 * @apiSuccess {String} review.name Display name of the reviewer
 * @apiSuccess {String} [review.text] Review's text content
 * @apiSuccess {String} [review.avatar] Reviewer's profile picture URL
 * @apiSuccessExample {json} Success Response:
 * HTTPS 200 OK
 * {
 *   "rating": 5,
 *   "name": "Barbago User",
 *   "avatar": "https://lh3.googleusercontent.com/a-/AOh14GiI1O3i5ADBISlcfU5ueNTWkOmvKc9Y_YtkuQOUddo=s96-c",
 *   "authorId": "hLvATvjgoKSybSXpjqBk2REj4Ak2",
 *   "vendorId": "hLvATvjgoKSybSXpjqBk2REj4Ak2",
 *   "text": "I am this barber and I rate myself 5 stars"
 * }
 */

/**
 * @apiDefine ReviewsSuccess
 *
 * @apiSuccess {Review[]} reviews
 * @apiSuccess {String} reviews.vendorId Firebase UID of the reviewed vendor
 * @apiSuccess {String} reviews.authorId Firebase UID of the reviewer
 * @apiSuccess {Number} reviews.rating Number of stars, integer 1-5
 * @apiSuccess {String} reviews.name Display name of the reviewer
 * @apiSuccess {String} [reviews.text] Review's text content
 * @apiSuccess {String} [reviews.avatar] Reviewer's profile picture URL
 * @apiSuccessExample {json} Success Response:
 * HTTPS 200 OK
 * [
 *   {
 *     "rating": 5,
 *     "name": "Barbago User",
 *     "avatar": "https://lh3.googleusercontent.com/a-/AOh14GiI1O3i5ADBISlcfU5ueNTWkOmvKc9Y_YtkuQOUddo=s96-c",
 *     "authorId": "hLvATvjgoKSybSXpjqBk2REj4Ak2",
 *     "vendorId": "hLvATvjgoKSybSXpjqBk2REj4Ak2",
 *     "text": "I am this barber and I rate myself 5 stars"
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
