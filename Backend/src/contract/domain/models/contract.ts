export class Contract {
  public createdAt: Date;
  public modifiedAt?: Date;
  public loanDate: Date;
  public clientName: string;
  public loanAmount: number;
  public interestRate: number;
  public dailyFine: number;
  public installments: number;
  public installmentsPayed: number;
  public pastDueAmount: number;
  public status: number;

  static new(data: Partial<Contract>) {
    const contract = new Contract(data);
    console.log(contract);

    contract.createdAt = new Date();
    return contract;
  }

  constructor(data: Partial<Contract>) {
    Object.assign(this, data);
  }
}
