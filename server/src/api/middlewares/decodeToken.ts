import { Request, Response, NextFunction } from 'express';
import { auth } from 'firebase-admin';
import { isProd } from '../config/environment';

export async function getUserFromUID(uid: string) {
  const user = await auth().getUser(uid);
  return user;
}

// https://fireship.io/snippets/express-middleware-auth-token-firebase/
export async function decodeToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authorization = req.headers?.authorization;

  if (authorization?.startsWith('Bearer ')) {
    const idToken = authorization?.split('Bearer ')[1];

    try {
      const decodedToken = await auth().verifyIdToken(idToken);
      const user = await getUserFromUID(decodedToken.uid);
      req['user'] = user;
    } catch (err) {
      console.error('Failed to decode ID token', idToken);
    }
  } else {
    await localAuthOverride(req);
  }

  next();
}

async function localAuthOverride(req: Request) {
  const uid = req.headers.authorization;
  if (
    !isProd &&
    req.hostname === 'localhost' &&
    typeof uid === 'string'
  ) {
    try {
      const user = await getUserFromUID(uid);
      req['user'] = user;
    } catch (err) {
      console.error('Failed to get UserRecord from UID', uid);
    }
  }
}
