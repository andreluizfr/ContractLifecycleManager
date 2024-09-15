import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { IsNotEmpty } from 'class-validator';
import { SaveUserUseCase } from 'src/user/application/ports/in/saveUser.useCase';
import { User } from 'src/user/domain/models/user';


class SaveUserRequest {
  //@Expose()
  @IsNotEmpty()
  readonly firstName: string;

  //@Expose()
  @IsNotEmpty()
  readonly lastName: string;

  //@Expose()
  @IsNotEmpty()
  readonly email: string;

  //@Expose()
  @IsNotEmpty()
  readonly password: string;

  async toUser(): Promise<User> {
    return User.new(this);
  }
}

@Controller()
export class SaveUserController {
  constructor(private readonly saveUserUseCase: SaveUserUseCase) {}

  @Post('/user/save')
  @UsePipes(new ValidationPipe({ transform: true }))
  async save(@Body() request: SaveUserRequest) {
    const user = await request.toUser();
    return await this.saveUserUseCase.saveUser(user);
  }
}
