import { UserUseCase } from "src/user/application/ports/in/user.useCase";
import { UserPersistensePort } from "src/user/application/ports/out/userPersistense.port";
import { Injectable } from "@nestjs/common";
import { User } from "src/user/domain/models/user";

@Injectable()
export class UserService implements UserUseCase {
    constructor(private userPersistensePort: UserPersistensePort){}

    async saveUser(user: Partial<User>): Promise<User> {
        return await this.userPersistensePort.persistUser(user);
    }
}