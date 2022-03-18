// https://javascript.plainenglish.io/how-to-unit-test-express-middleware-typescript-jest-c6a7ad166e74
// https://www.npmjs.com/package/@jest-mock/express
import { getMockReq, getMockRes } from '@jest-mock/express';
import httpError, { HttpError } from 'http-errors';

import {
  notFoundHandler,
  errorHandler,
} from '../../src/api/middlewares';

let err: HttpError;
let req = getMockReq();
let { res, next, clearMockRes } = getMockRes();

beforeEach(() => {
  jest.resetAllMocks();
  clearMockRes();
  err = httpError(400);
});

describe('error handler', () => {
  test('should log errors using ____', () => {});

  for (let code of [400, 401, 402, 403, 404, 408, 409, 429, 500]) {
    test(`should return error code ${code}`, () => {
      const { res } = getMockRes({ statusCode: code });
      err.status = code;
      errorHandler(err as HttpError, req, res, next);
      expect(res.statusCode).toBe(code);
    });
  }
});

describe('not found handler', () => {
  test('should throw 404', () => {
    expect(() => notFoundHandler(req, res, next)).toThrowError(
      /not found/,
    );
  });
});
