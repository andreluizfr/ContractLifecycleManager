import { Module } from '@nestjs/common';
import { UserController } from 'src/user/adapter/in/user.controller';
import { UserService } from 'src/user/application/services/user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}