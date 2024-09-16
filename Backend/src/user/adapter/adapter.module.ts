import { forwardRef, Module } from "@nestjs/common";
import { AppModule } from "src/app.module";
import { UserController } from "src/user/adapter/in/user.controller";
import { ServicesOut } from "src/user/adapter/adapter.provider";

@Module({
  imports: [
    forwardRef(() => AppModule),
  ],
  providers: [...ServicesOut],
  exports: [...ServicesOut],
  controllers: [UserController],
})

export class AdapterModule {}