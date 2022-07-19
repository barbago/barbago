import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { UserRecord } from 'firebase-functions/v1/auth';
import httpError from 'http-errors';
import { isAuthenticated } from '../../middlewares';
import { getVendorByUid } from '../vendor/vendor.service';
import * as reviewService from './review.service';

export const reviewRouter = Router({ mergeParams: true });

/**
 * @apiDefine VendorId
 * @apiParam {String} uid Vendor's Firebase User ID
 */

/**
 * @api {delete} /vendors/:uid/reviews Delete user's review under vendor
 * @apiUse VendorId
 *
 * @apiGroup Reviews
 * @apiName deleteVendorReview
 * @apiVersion 1.0.0
 * @apiPermission Authenticated
 *
 * @apiUse BearerAuth
 * @apiUse UnauthorizedError
 * @apiUse NotFoundError
 */
reviewRouter.delete(
  '/',
  isAuthenticated,
  asyncHandler(async (req, res) => {
    const { uid: vendorId } = req.params;
    const { uid: authorId } = req['user'] as UserRecord;

    const review = await reviewService.getVendorReviewById(
      vendorId,
      authorId,
    );

    if (!review) throw httpError(404, 'review not found');

    await reviewService.deleteReview(vendorId, authorId);

    res.json(review);
  }),
);

/**
 * @api {get} /vendors/:uid/reviews Get all of a vendor's reviews
 * @apiUse VendorId
 *
 * @apiGroup Reviews
 * @apiName getVendorReviews
 * @apiVersion 1.0.0
 */
reviewRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    console.log(req.params);
    const { uid } = req.params;
    if (!uid) throw httpError(400, 'vendor id is a required field');

    const reviews = await reviewService.getVendorReviews(uid);

    res.json(reviews);
  }),
);

/**
 * @api {post} /vendors/:uid/reviews Create a review for a vendor
 * @apiUse VendorId
 * @apiBody {Number} rating a number from 1 to 5 representing stars
 * @apiBody {String} [review] string representing review content
 *
 * @apiGroup Reviews
 * @apiName createVendorReview
 * @apiVersion 1.0.0
 * @apiPermission Authenticated
 *
 * @apiUse BearerAuth
 * @apiUse BadRequestError
 * @apiUse UnauthorizedError
 * @apiUse NotFoundError
 * @apiUse ConflictError
 */
reviewRouter.post(
  '/',
  isAuthenticated,
  asyncHandler(async (req, res) => {
    const { uid: vendorId } = req.params;
    const { rating, text } = req.body;
    const {
      displayName: name,
      uid: authorId,
      photoURL: avatar,
    } = req['user'] as UserRecord;

    if (!vendorId)
      throw httpError(400, 'Vendor ID is a required field');
    if (!rating) throw httpError(400, 'Rating is a required field');
    if (typeof rating !== 'number' || rating < 1 || rating > 5)
      throw httpError(400, 'Rating must be a number from 1 to 5');
    if (!(await getVendorByUid(vendorId)))
      throw httpError(404, 'Vendor does not exist!');
    if (await reviewService.getVendorReviewById(vendorId, authorId))
      throw httpError(409, 'You have already created a review here!');

    const params = {
      authorId,
      vendorId,
      name,
      avatar,
      rating,
      text,
    };

    // todo: change how name and avatar are handled
    // preferably store in firebase and use userService
    const result = await reviewService.createReview(
      vendorId,
      authorId,
      params,
    );

    res.json(result);
  }),
);
