import { BankAccount } from "./BankAccount";
import { Client } from "./Client";
import User from "./User";

export type FinancialTransaction = {
  _id: string
  user: User
  client: Client
  transactionType: TransactionType
  transactionMethod: TransactionMethod
  amount: number
  pixKey?: string | null
  bank?: BankAccount | null
  observations: string
}

export enum TransactionType {
  ENTRANCE = 1,
  EXIT = 2
}

export enum TransactionMethod {
  PIX = 1,
  TED = 2,
  BANK_SLIP = 3
}