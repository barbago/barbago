import { Service } from 'typedi';
import { DeepPartial } from 'typeorm';

import { connect } from '../../config/database';
import { User } from '../../entities';

@Service()
export class UserService {
  private async getUserRepository() {
    const connection = await connect();
    const userRepository = connection.getRepository(User);
    return userRepository;
  }

  public getAllUsers = async (limit?: number, offset?: number) => {
    const userRepo = await this.getUserRepository();
    const users = await userRepo.find({ skip: offset, take: limit });
    return users;
  };

  public getUser = async (uid: string) => {
    const userRepo = await this.getUserRepository();
    const user = await userRepo.findOne(uid);
    return user;
  };

  public createUser = async (user: User) => {
    const userRepo = await this.getUserRepository();
    return await userRepo.create(user).save();
  };

  public updateUser = async (
    uid: string,
    user: DeepPartial<User>,
  ) => {
    const userRepo = await this.getUserRepository();
    return await userRepo.update(uid, user);
  };

  public deleteUser = async (uid: string) => {
    const userRepo = await this.getUserRepository();
    return await userRepo.delete(uid);
  };
}
