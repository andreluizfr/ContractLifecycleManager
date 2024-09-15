import { Injectable } from "@nestjs/common";
import { UserPersistensePort } from "src/user/application/ports/out/userPersistense.port";
import { UserMapper } from "./user-mapper";
import { User } from "src/user/domain/models/user";
import { UserDocument } from "./user.schema";

@Injectable()
export class UserPersistenseAdapter implements UserPersistensePort {
  constructor(private userMapper: UserMapper) {}

  async persistUser(user: Partial<User>): Promise<UserDocument> {
    const userModel = this.userMapper.toModel(user);
    return userModel.save();
  }
}