import { Provider } from "@nestjs/common"
import { ContractPersistensePort } from "src/contract/application/ports/out/contractPersistense.port"
import { ContractPersistenceAdapter } from "src/contract/adapter/out/contract-persistence.adapter";
import { ContractMapper } from "src/contract/adapter/out/contract-mapper";

export const ServicesOut: Provider[] = [
  {
    provide: ContractPersistensePort,
    useClass: ContractPersistenceAdapter
  },
  ContractMapper,
]