import { Provider } from "@nestjs/common"
import { ContractUseCase } from "src/contract/application/ports/in/contract.useCase"
import { ContractService } from "src/contract/application/services/contract.service"

export const Services: Provider[] = [
  {
    provide: ContractUseCase,
    useClass: ContractService
  }
]