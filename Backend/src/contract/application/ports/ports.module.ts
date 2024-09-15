import { Module } from '@nestjs/common';
import { SaveContractController } from 'src/contract/adapter/in/saveContract.controller';
import { SaveContractService } from 'src/contract/application/services/saveContract.service';
import { LoadPaginatedContractsController } from 'src/contract/adapter/in/loadPaginatedContracts.controller';
import { LoadPaginatedContractsService } from 'src/contract/application/services/loadPaginatedContracts.service';

@Module({
  controllers: [SaveContractController, LoadPaginatedContractsController],
  providers: [SaveContractService, LoadPaginatedContractsService],
})
export class UserModule {}