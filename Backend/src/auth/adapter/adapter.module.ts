import { forwardRef, Module } from "@nestjs/common";
import { AppModule } from "src/app.module";
import { AuthController } from "src/auth/adapter/in/auth.controller";

@Module({
  imports: [
    forwardRef(() => AppModule),
  ],
  controllers: [AuthController],
})

export class AdapterModule {}