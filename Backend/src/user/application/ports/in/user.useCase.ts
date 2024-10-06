import { LoginDTO } from "src/auth/domain/dtos/loginDTO";
import { User } from "src/user/domain/models/user";

export abstract class UserUseCase {
  abstract saveUser(user: Partial<User>): Promise<User>;
  abstract getUserByEmail(email: string): Promise<User | null>;
  abstract getUserFromLogin(loginDTO: LoginDTO): Promise<User | null>;
}