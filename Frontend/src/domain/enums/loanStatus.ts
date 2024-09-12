export type LoanStatus = {cod: number, id: string, fallbackDescription: string}
export type LoanStatusEnum = {[key: string]: LoanStatus}

export const loanStatus: LoanStatusEnum = {
    "GOOD_STANDING": {
        cod: 1,
        id: "goodStanding",
        fallbackDescription: "Em dia"
    },
    "PAST_DUE": {
        cod: 2,
        id: "pastDue",
        fallbackDescription: "Atrasado"
    },
    "DEFAULT": {
        cod: 3,
        id: "default",
        fallbackDescription: "Inadimplente"
    },
    "PAID_OFF": {
        cod: 4,
        id: "paidOff",
        fallbackDescription: "Pago"
    }
}

export function recreateEnum (cod: number): LoanStatus | null {
    return loanStatus[Object.keys(loanStatus).filter(statusKey => loanStatus[statusKey].cod === cod)[0]] ?? null;
}