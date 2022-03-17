import { Request, Response, NextFunction } from 'express';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';
import httpError from 'http-errors';

// https://fireship.io/snippets/express-middleware-auth-token-firebase/
export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (req['user'] as UserRecord) next();
  else throw httpError(401);
}
