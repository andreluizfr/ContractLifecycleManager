import { User } from "src/user/domain/models/user";

export abstract class SaveUserUseCase {
    abstract saveUser(user: Partial<User>): Promise<User>;
}