import { Injectable } from "@nestjs/common";
import { UserPersistensePort } from "src/user/application/ports/out/userPersistense.port";
import { UserMapper } from "./user-mapper";
import { User } from "src/user/domain/models/user";
import { UserDocument, UserModel, UserSchema } from "./user.schema";
import { model } from "mongoose";

@Injectable()
export class UserPersistenseAdapter implements UserPersistensePort {
  userModel: UserModel;

  constructor(private userMapper: UserMapper) {
    this.userModel = model<UserDocument>('User', UserSchema);
  }

  async persistUser(user: Partial<User>): Promise<User> {
    const userModel = this.userMapper.toModel(user);
    return this.userMapper.toDomain(await userModel.save());
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({'email': email});
    return user ? this.userMapper.toDomain(user) : null;
  }

  async getUserFromLogin(login: string): Promise<User | null> {
    const user = await this.userModel.findOne({  //TODO criar lógica para checar nome de usuário ou email
      'email': login,
      $or: [
        { 'googleOAuthFlag': null },
        { 'googleOAuthFlag': false }
      ]
    });

    return user ? this.userMapper.toDomain(user) : null;
  }

}