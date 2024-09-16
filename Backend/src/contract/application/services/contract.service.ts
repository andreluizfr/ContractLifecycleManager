import { ContractUseCase } from "src/contract/application/ports/in/contract.useCase";
import { ContractPersistensePort } from "src/contract/application/ports/out/contractPersistense.port";
import { Injectable } from "@nestjs/common";
import { Contract } from "src/contract/domain/models/contract";
import { LoadPaginatedContractsDTO } from "src/contract/domain/dtos/loadPaginatedContractsDTO";
import { PaginatedContractsResultDTO } from "src/contract/domain/dtos/paginatedContractsResultDTO";

@Injectable()
export class ContractService implements ContractUseCase {
  constructor(private contractPersistensePort: ContractPersistensePort){}

  async saveContract(contract: Partial<Contract>): Promise<Contract> {
    return await this.contractPersistensePort.persistContract(contract);
  }

  async loadPaginatedContracts(request: LoadPaginatedContractsDTO): Promise<PaginatedContractsResultDTO> {
    return await this.contractPersistensePort.loadPaginatedContracts(request);
  }
}