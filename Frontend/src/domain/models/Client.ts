import { BankAccount } from "./BankAccount"

export type Client = {
  _id: string
  name: string
  phoneNumber: string
  cpf: string
  rg: string
  address: string
  pixKey?: string | null
  bankAccount?: BankAccount | null
  observations: string
}