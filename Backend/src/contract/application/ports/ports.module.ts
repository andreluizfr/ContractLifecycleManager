import { Module } from '@nestjs/common';
import { ContractController } from 'src/contract/adapter/in/contract.controller';
import { ContractService } from 'src/contract/application/services/contract.service';

@Module({
  controllers: [ContractController],
  providers: [ContractService],
})
export class PortModule {}