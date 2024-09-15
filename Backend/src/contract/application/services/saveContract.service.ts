import { SaveContractUseCase } from "src/contract/application/ports/in/saveContract.useCase";
import { ContractPersistensePort } from "src/contract/application/ports/out/contractPersistense.port";
import { Injectable } from "@nestjs/common";
import { Contract } from "src/contract/domain/models/contract";

@Injectable()
export class SaveContractService implements SaveContractUseCase {
    constructor(private contractPersistensePort: ContractPersistensePort){}

    async saveContract(contract: Partial<Contract>): Promise<Contract> {
        return await this.contractPersistensePort.persistContract(contract);
    }
}