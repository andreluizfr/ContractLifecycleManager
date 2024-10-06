import { User } from "src/user/domain/models/user";

export abstract class UserPersistensePort {
    abstract persistUser(user: Partial<User>): Promise<User>;
    abstract getUserByEmail(email: string): Promise<User | null>;
    abstract getUserFromLogin(login: string): Promise<User | null>;
}