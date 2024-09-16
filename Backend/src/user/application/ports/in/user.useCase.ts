import { User } from "src/user/domain/models/user";

export abstract class UserUseCase {
    abstract saveUser(user: Partial<User>): Promise<User>;
}