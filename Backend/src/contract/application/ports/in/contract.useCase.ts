import { LoadPaginatedContractsDTO } from "src/contract/domain/dtos/loadPaginatedContractsDTO";
import { PaginatedContractsResultDTO } from "src/contract/domain/dtos/paginatedContractsResultDTO";
import { Contract } from "src/contract/domain/models/contract";

export abstract class ContractUseCase {
  abstract saveContract(user: Partial<Contract>): Promise<Contract>;
  abstract loadPaginatedContracts(request: LoadPaginatedContractsDTO): Promise<PaginatedContractsResultDTO>;
}