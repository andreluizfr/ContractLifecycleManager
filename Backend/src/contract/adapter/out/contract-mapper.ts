import { Inject, Injectable } from "@nestjs/common";
import { MongoDatabaseService } from "src/persistence/mongo-database-service";
import { ContractDocument, ContractModel, ContractSchema } from "./contract.schema";
import { Contract } from "src/contract/domain/models/contract";

@Injectable()
export class ContractMapper {
  constructor(@Inject('MongoDatabaseService') private readonly mongoDatabaseService: MongoDatabaseService){}

  toModel(contract: Partial<Contract>): ContractDocument {
    const Contract: ContractModel = this.mongoDatabaseService.conn.connection.model<ContractDocument>('Contract', ContractSchema);
    return new Contract({
      loanDate: contract.loanDate,
      clientName: contract.clientName,
      loanAmount: contract.loanAmount,
      interestRate: contract.interestRate,
      dailyFine: contract.dailyFine,
      installments: contract.installments,
      installmentsPayed: contract.installmentsPayed,
      pastDueAmount: contract.pastDueAmount,
      status: contract.status
    });
  }
}