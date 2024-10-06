import { Inject, Injectable } from "@nestjs/common";
import { User } from "src/user/domain/models/user";
import { UserDocument, UserModel, UserSchema } from "./user.schema";
import { MongoDatabaseService } from "src/persistence/mongo-database-service";

@Injectable()
export class UserMapper {
  constructor(@Inject('MongoDatabaseService') private readonly mongoDatabaseService: MongoDatabaseService){}

  toModel(user: Partial<User>): UserDocument {
    const UserModel: UserModel = this.mongoDatabaseService.conn.connection.model<UserDocument>('User', UserSchema);
    return new UserModel({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      modifiedAt: user.modifiedAt,
      googleOAuthFlag: user.googleOAuthFlag
    });
  }

  toDomain(user: UserDocument): User {
    return new User({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      modifiedAt: user.modifiedAt,
      googleOAuthFlag: user.googleOAuthFlag
    });
  }
}