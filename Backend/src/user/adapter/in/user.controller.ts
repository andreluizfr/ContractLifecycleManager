import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserUseCase } from 'src/user/application/ports/in/user.useCase';
import { SaveUserRequest } from 'src/user/domain/dtos/saveUserDTO';

@Controller('user')
export class UserController {
  constructor(private readonly UserUseCase: UserUseCase) {}

  @Post('save')
  @UsePipes(new ValidationPipe({ transform: true }))
  async save(@Body() request: SaveUserRequest) {
    const user = await request.toUser();
    return await this.UserUseCase.saveUser(user);
  }
}
