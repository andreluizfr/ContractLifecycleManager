import { forwardRef, Module } from "@nestjs/common";
import { AppModule } from "src/app.module";
import { SaveContractController } from "src/contract/adapter/in/saveContract.controller";
import { LoadPaginatedContractsController } from "./in/loadPaginatedContracts.controller";
import { ServicesOut } from "src/contract/adapter/adapter.provider";

@Module({
  imports: [
    forwardRef(() => AppModule),
  ],
  providers: [...ServicesOut],
  exports: [...ServicesOut],
  controllers: [SaveContractController, LoadPaginatedContractsController],
})

export class AdapterModule {}