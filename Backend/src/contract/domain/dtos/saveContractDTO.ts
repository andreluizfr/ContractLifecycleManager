import { IsNotEmpty } from "class-validator";
import { Contract } from "../models/contract";

export class SaveContractDTO {
  //@Expose()
  @IsNotEmpty()
  readonly loanDate: Date;

  //@Expose()
  @IsNotEmpty()
  readonly clientName: string;

  //@Expose()
  @IsNotEmpty()
  readonly loanAmount: number;

  //@Expose()
  @IsNotEmpty()
  readonly interestRate: number;

  //@Expose()
  @IsNotEmpty()
  readonly dailyFine: number;

  //@Expose()
  @IsNotEmpty()
  readonly installments: number;

  //@Expose()
  @IsNotEmpty()
  readonly installmentsPayed: number;

  //@Expose()
  @IsNotEmpty()
  readonly pastDueAmount: number;

  //@Expose()
  @IsNotEmpty()
  readonly status: number;

  toContract(): Contract {
    return Contract.new(this);
  }
}