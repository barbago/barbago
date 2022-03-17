import { Request, Response, NextFunction } from 'express';
import httpError from 'http-errors';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';

export enum Role {
  ADMIN = 'ADMIN',
  BARBER = 'BARBER',
  CLIENT = 'CLIENT',
}

export function isRole(role: Role) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const user = req['user'] as UserRecord;
    if (!user) throw httpError(401);
    if (user.customClaims?.roles?.includes(role)) {
      return next();
    }
    throw httpError(403);
  };
}

export const isRoleAdmin = isRole(Role.ADMIN);

export const isRoleBarber = isRole(Role.BARBER);

export const isRoleClient = isRole(Role.CLIENT);

/*
Barbago is using Role Based Access Control by setting custom claims with Firebase.

https://firebase.google.com/docs/auth/admin/custom-claims

claims: {
  Roles: ['ADMIN', 'BARBER', 'CLIENT']
}

*/

// // Setting Custom Claims
// app.get('/', [decodeToken], (req, res) => {
//   const currentUser = req['currentUser'];
//   auth()
//     .setCustomUserClaims(currentUser.uid, {
//       roles: ['ADMIN'],
//     })
//     .then(() => res.send('suck seed'))
//     .catch(console.error);
// });
