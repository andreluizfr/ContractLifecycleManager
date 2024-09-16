import { forwardRef, Module } from "@nestjs/common";
import { AppModule } from "src/app.module";
import { ContractController } from "src/contract/adapter/in/contract.controller";
import { ServicesOut } from "src/contract/adapter/adapter.provider";

@Module({
  imports: [
    forwardRef(() => AppModule),
  ],
  providers: [...ServicesOut],
  exports: [...ServicesOut],
  controllers: [ContractController],
})

export class AdapterModule {}