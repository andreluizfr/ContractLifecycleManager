import { Module } from '@nestjs/common';
import { SaveUserController } from 'src/user/adapter/in/saveUser.controller';
import { SaveUserService } from 'src/user/application/services/saveUser.service';

@Module({
  controllers: [SaveUserController],
  providers: [SaveUserService],
})
export class UserModule {}