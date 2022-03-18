import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';
import httpError from 'http-errors';
import { Service } from 'typedi';
import { User } from '.';

import { UserService } from './user.service';

@Service()
export class UserController {
  constructor(private userService: UserService) {}

  public getAllUsers = asyncHandler(
    async (req: Request, res: Response) => {
      const limit = parseInt((req.query.limit as string) ?? '20');
      let offset = parseInt((req.query.offset as string) ?? '0');
      if (offset > 20) offset = 20;

      const users = await this.userService.getAllUsers(limit, offset);
      res.json(users);
    },
  );

  public getCurrentUser = asyncHandler(
    async (req: Request, res: Response) => {
      const user = req['user'] as UserRecord;
      if (!user) throw httpError(401);
      const found = await this.userService.getUser(user.uid);
      if (!found) throw httpError(404);
      res.json(found);
    },
  );

  public getUserById = asyncHandler(
    async (req: Request, res: Response) => {
      const { uid } = req.params;
      const found = await this.userService.getUser(uid);
      if (!found) throw httpError(404);
      res.json(found);
    },
  );

  public createUser = asyncHandler(
    async (req: Request, res: Response) => {
      const user = req['user'] as UserRecord;
      const { displayName, email, uid } = user;
      const newUser = new User(uid, displayName ?? '', email ?? '');
      const created = await this.userService.createUser(newUser);
      res.json(created);
    },
  );

  public deleteUser = asyncHandler(
    async (req: Request, res: Response) => {
      const { uid } = req['user'] as UserRecord;
      const found = await this.userService.getUser(uid);
      if (!found) throw httpError(404);
      await this.userService.deleteUser(uid);
      res.json(found);
    },
  );

  public deleteUserById = asyncHandler(
    async (req: Request, res: Response) => {
      const { uid } = req.params;
      const found = await this.userService.getUser(uid);
      if (!found) throw httpError(404);
      await this.userService.deleteUser(uid);
      res.status(204).json(found);
    },
  );

  public updateUser = asyncHandler(
    async (req: Request, res: Response) => {
      const { uid } = req['user'] as UserRecord;
      const { name, email } = req.body;
      const found = await this.userService.getUser(uid);
      if (!found) throw httpError(404);
      const updated = await this.userService.updateUser(uid, {
        name,
        email,
      });
      res.json(updated);
    },
  );

  public updateUserById = asyncHandler(
    async (req: Request, res: Response) => {
      const { uid } = req.params;
      const { name, email } = req.body;
      const found = await this.userService.getUser(uid);
      if (!found) throw httpError(404);
      const updated = await this.userService.updateUser(uid, {
        name,
        email,
      });
      res.json(updated);
    },
  );
}
