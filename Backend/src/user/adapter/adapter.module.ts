import { forwardRef, Module } from "@nestjs/common";
import { AppModule } from "src/app.module";
import { SaveUserController } from "src/user/adapter/in/saveUser.controller";
import { ServicesOut } from "src/user/adapter/adapter.provider";

@Module({
  imports: [
    forwardRef(() => AppModule),
  ],
  providers: [...ServicesOut],
  exports: [...ServicesOut],
  controllers: [SaveUserController],
})

export class AdapterModule {}