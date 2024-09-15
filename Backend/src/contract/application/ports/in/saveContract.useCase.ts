import { Contract } from "src/contract/domain/models/contract";

export abstract class SaveContractUseCase {
  abstract saveContract(user: Partial<Contract>): Promise<Contract>;
}