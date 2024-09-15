import { UserDocument } from "src/user/adapter/out/user.schema";
import { User } from "src/user/domain/models/user";

export abstract class UserPersistensePort {
    abstract persistUser(user: Partial<User>): Promise<UserDocument>;
}