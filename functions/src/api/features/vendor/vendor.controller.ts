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
    const {} = req.body;

    if (!uid) throw httpError(400);

    if (await vendorService.getVendorByUid(uid)) throw httpError(409);

    const vendor = await vendorService.createVendor(uid, req.body);

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
 * @apiUse BadRequestError
 * @apiUse UnauthorizedError
 * @apiUse NotFoundError
 */
vendorRouter.delete(
  '/',
  isAuthenticated,
  asyncHandler(async (req, res) => {
    const { uid } = req['user'] as UserRecord;

    if (!uid) throw httpError(400);

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
 * @apiUse BadRequestError
 * @apiUse UnauthorizedError
 * @apiUse NotFoundError
 */
vendorRouter.get(
  '/',
  isAuthenticated,
  asyncHandler(async (req, res) => {
    const { uid } = req['user'] as UserRecord;

    if (!uid) throw httpError(400);

    const vendor = await vendorService.getVendorByUid(uid);

    if (!vendor) throw httpError(404);

    res.json(vendor);
  }),
);

/**
 * @api {get} /vendor/:uid Get a vendor's profile by their UID
 * @apiParam {String} uid Firebase User ID
 *
 * @apiGroup Vendors
 * @apiName getVendorById
 * @apiVersion 1.0.0
 *
 * @apiUse NotFoundError
 */
vendorRouter.get(
  '/:uid',
  asyncHandler(async (req, res) => {
    const { uid } = req.params;

    const vendor = await vendorService.getVendorByUid(uid);

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

    if (!uid) throw httpError(400);

    if (!(await vendorService.getVendorByUid(uid)))
      throw httpError(404);

    const vendor = await vendorService.updateVendor(uid, req.body);

    res.json(vendor);
  }),
);

/**
 * @api {get} /vendor/ Search for vendors
 *
 * @apiGroup Vendors
 * @apiName searchVendor
 * @apiVersion 1.0.0
 *
 * @apiUse BearerAuth
 */

vendorRouter.post(
  '/search',
  asyncHandler(async (req, res) => {
    const vendors = await vendorService.searchVendors(req.body);

    res.json(vendors);
  }),
);
