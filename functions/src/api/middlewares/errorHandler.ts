import { Request, Response, NextFunction } from 'express';
import httpError, { HttpError } from 'http-errors';

export const notFoundHandler = (
  _req: Request,
  _res: Response,
  _next: NextFunction,
) => {
  throw httpError(404);
};

export const errorHandler = (
  err: HttpError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const { status, message } = err;
  if (!status || status >= 500) {
    console.error(err);
  }
  return res.status(status || 500).json({
    status: status || 500,
    message: message || 'Unexpected Server Error',
  });
};
