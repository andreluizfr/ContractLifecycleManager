import { LoadPaginatedContractsDTO } from "src/contract/domain/dtos/loadPaginatedContractsDTO";
import { PaginatedContractsResultDTO } from "src/contract/domain/dtos/paginatedContractsResultDTO";

export abstract class LoadPaginatedContractsUseCase {
    abstract loadPaginatedContracts(request: LoadPaginatedContractsDTO): Promise<PaginatedContractsResultDTO>;
}