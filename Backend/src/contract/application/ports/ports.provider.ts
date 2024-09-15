import { Provider } from "@nestjs/common"
import { SaveContractUseCase } from "src/contract/application/ports/in/saveContract.useCase"
import { SaveContractService } from "src/contract/application/services/saveContract.service"
import { LoadPaginatedContractsUseCase } from "./in/loadPaginatedContracts.useCase"
import { LoadPaginatedContractsService } from "../services/loadPaginatedContracts.service"

export const Services: Provider[] = [
  {
    provide: SaveContractUseCase,
    useClass: SaveContractService
  },
  {
    provide: LoadPaginatedContractsUseCase,
    useClass: LoadPaginatedContractsService
  }
]