import { UserUseCase } from "src/user/application/ports/in/user.useCase";
import { UserPersistensePort } from "src/user/application/ports/out/userPersistense.port";
import { Injectable } from "@nestjs/common";
import { User } from "src/user/domain/models/user";
import { LoginDTO } from "src/auth/domain/dtos/loginDTO";

@Injectable()
export class UserService implements UserUseCase {
  constructor(private userPersistensePort: UserPersistensePort){}

  async saveUser(user: Partial<User>): Promise<User> {
    const savedUser = await this.userPersistensePort.persistUser(user);
    console.log("New User...");
    console.log(savedUser);
    return savedUser;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.userPersistensePort.getUserByEmail(email);
  }

  async getUserFromLogin(loginDTO: LoginDTO): Promise<User | null> {
    return this.userPersistensePort.getUserFromLogin(loginDTO.email);
  }
}