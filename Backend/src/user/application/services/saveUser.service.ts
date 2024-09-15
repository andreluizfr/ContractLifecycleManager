import { SaveUserUseCase } from "src/user/application/ports/in/saveUser.useCase";
import { UserPersistensePort } from "src/user/application/ports/out/userPersistense.port";
import { Injectable } from "@nestjs/common";
import { User } from "src/user/domain/models/user";

@Injectable()
export class SaveUserService implements SaveUserUseCase {
    constructor(private userPersistensePort: UserPersistensePort){}

    async saveUser(user: Partial<User>): Promise<User> {
        return await this.userPersistensePort.persistUser(user);
    }
}