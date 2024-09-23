import { FinancialInstitution } from "./FinancialInstitution"

export type BankAccount = {
  _id: string,
  financialInstitution: FinancialInstitution,
  agence: string,
  account: string
}