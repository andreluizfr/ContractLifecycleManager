export type Contract = {
  id: number
  loanDate: Date
  clientName: string
  loanAmount: number
  interestRate: number
  dailyFine: number
  installments: number
  installmentsPayed: number
  pastDueAmount: number
  status: number
}
