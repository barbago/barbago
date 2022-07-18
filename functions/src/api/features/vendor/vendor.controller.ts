import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { UserRecord } from 'firebase-functions/v1/auth';
import httpError from 'http-errors';

import { isAuthenticated } from '../../middlewares';
import * as vendorService from './vendor.service';

export const vendorRouter = Router();

/**
 * @api {post} /vendor/ Create a new vendor
 * @apiBody {String} location Location displayed on profile
 * @apiBody {String} link Custom link to profile in app
 *
 * @apiGroup Vendors
 * @apiName createVendor
 * @apiVersion 1.0.0
 * @apiPermission Authenticated
 *
 * @apiUse BearerAuth
 * @apiUse BadRequestError
 * @apiUse UnauthorizedError
 * @apiUse ConflictError
 */

vendorRouter.post(
  '/',
  isAuthenticated,
  asyncHandler(async (req, res) => {
    const { uid } = req['user'] as UserRecord;
    const { name, link, location, latitude, longitude } = req.body;

    // todo: switch this out for express-validator
    if (!name) throw httpError(400, 'name is a required field');
    if (!link) throw httpError(400, 'link is a required field');
    if (!link.match(/^[\w-]+$/))
      throw httpError(400, 'link must only contain chars and dashes');

    if (
      (
        await Promise.all([
          vendorService.getVendorByUid(uid),
          vendorService.getVendorByLink(link),
        ])
      ).some((res) => !!res)
    )
      throw httpError(409);

    const params = { uid, name, link, location, latitude, longitude };

    const vendor = await vendorService.createVendor(uid, params);

    res.json(vendor);
  }),
);

/**
 * @api {delete} /vendor/ Delete current vendor profile
 *
 * @apiGroup Vendors
 * @apiName deleteCurrentVendor
 * @apiVersion 1.0.0
 * @apiPermission Current User
 *
 * @apiUse BearerAuth
 * @apiUse UnauthorizedError
 * @apiUse NotFoundError
 */
vendorRouter.delete(
  '/',
  isAuthenticated,
  asyncHandler(async (req, res) => {
    const { uid } = req['user'] as UserRecord;

    const vendor = await vendorService.getVendorByUid(uid);

    if (!vendor) throw httpError(404);

    await vendorService.deleteVendor(uid);

    res.json(vendor);
  }),
);

/**
 * @api {get} /vendor/
 *
 * @apiGroup Vendors
 * @apiName getCurrentUser
 * @apiVersion 1.0.0
 * @apiPermission Current User
 *
 * @apiUse BearerAuth
 * @apiUse UnauthorizedError
 * @apiUse NotFoundError
 */
vendorRouter.get(
  '/',
  isAuthenticated,
  asyncHandler(async (req, res) => {
    const { uid } = req['user'] as UserRecord;

    const vendor = await vendorService.getVendorByUid(uid);

    if (!vendor) throw httpError(404);

    res.json(vendor);
  }),
);

/**
 * @api {get} /vendor/uid/:uid Get a vendor's profile by their UID
 * @apiParam {String} uid Firebase User ID
 *
 * @apiGroup Vendors
 * @apiName getVendorById
 * @apiVersion 1.0.0
 *
 * @apiUse NotFoundError
 */
vendorRouter.get(
  'uid/:uid',
  asyncHandler(async (req, res) => {
    const { uid } = req.params;

    const vendor = await vendorService.getVendorByUid(uid);

    if (!vendor) throw httpError(404);

    res.json(vendor);
  }),
);

/**
 * @api {get} /vendor/:link Get a vendor's profile by link
 * @apiParam {String} link Customizable link to profile
 *
 * @apiGroup Vendors
 * @apiName getVendorByLink
 * @apiVersion 1.0.0
 *
 * @apiUse BadRequestError
 * @apiUse NotFoundError
 */
vendorRouter.get(
  '/:link',
  asyncHandler(async (req, res) => {
    const { link } = req.params;

    if (!link) throw httpError(400);

    const vendor = await vendorService.getVendorByLink(link);

    if (!vendor) throw httpError(404);

    res.json(vendor);
  }),
);

/**
 * @api {put} /vendor/ Update a vendor profile
 *
 * @apiGroup Vendors
 * @apiName updateCurrentVendor
 * @apiVersion 1.0.0
 *
 * @apiUse BearerAuth
 * @apiUse BadRequestError
 * @apiUse UnauthorizedError
 * @apiUse NotFoundError
 */
vendorRouter.put(
  '/',
  isAuthenticated,
  asyncHandler(async (req, res) => {
    const { uid } = req['user'] as UserRecord;
    const { name, location, latitude, longitude, cover, images } =
      req.body;

    if (!(await vendorService.getVendorByUid(uid)))
      throw httpError(404);

    const vendor = await vendorService.updateVendor(uid, req.body);

    res.json(vendor);
  }),
);

/**
 * @api {post} /vendor/search Search for vendors
 * @apiBody {Number} latitude
 * @apiBody {Number} longitude
 * @apiBody {Number} [distance=30000] radius in meters from coords
 *
 * @apiGroup Vendors
 * @apiName searchVendor
 * @apiVersion 1.0.0
 *
 * @apiUse BearerAuth
 * @apiUse BadRequestError
 */

vendorRouter.post(
  '/search',
  asyncHandler(async (req, res) => {
    const { latitude, longitude, distance = 30000 } = req.body;

    if (!latitude || typeof latitude !== 'number')
      throw httpError(400, 'latitude is required and must be a number');
    if (!longitude || typeof longitude !== 'number')
      throw httpError(400, 'longitude is required and must be a numbe');
    if (typeof distance !== 'number')
      throw httpError(400, 'distance must be a number');

    const params = {
      latitude,
      longitude,
      distance,
    };

    const vendors = await vendorService.searchVendors(params);

    res.json(vendors);
  }),
);
