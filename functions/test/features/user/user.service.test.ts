import 'reflect-metadata'; // required for typedi
import { Container } from 'typedi';

import { UserService } from '../../../src/features/user';

const userService = Container.get(UserService);

describe('User Service', () => {
  test('should successfully get all users', async () => {
    const users = await userService.getUsers();
  });
  test('should get a single user by name', () => {});
  test("should throw an error if a user doesn't exist", () => {});
});
