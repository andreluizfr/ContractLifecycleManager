import { ColumnDef } from "@tanstack/react-table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "../dropdown-menu";
import { Button } from "../button";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { recreateEnum } from "@/domain/enums/loanStatus";
import { Trans } from "react-i18next";
import { Checkbox } from "../checkbox";
import DataTableColumnHeader from "./data-table-column-header";

export type LoanDTO = {
    id: number
    loanDate: string
    clientName: string
    loanAmount: number
    interestRate: number
    dailyFine: number
    installments: number
    installmentsPayed: number
    pastDueAmount: number
    status: number
}

export const loanDataTableColumns: ColumnDef<LoanDTO>[] = [
    {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "clientName",
        header: () => <div className="text-center font-medium whitespace-nowrap">Nome Cliente</div>,
        cell: ({ row }) => <div className="text-center font-medium">{row.getValue("clientName")}</div>
    },
    {
        accessorKey: "loanDate",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    <div className="text-center font-medium whitespace-nowrap">Data Emprést.</div>
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="text-center font-medium">{row.getValue("loanDate")}</div>
    },
    {
        accessorKey: "loanAmount",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Valor Emprést." />,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("loanAmount"))
            const formatted = new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
            }).format(amount)
            return <div className="text-center font-medium">{formatted}</div>
        }
    },
    {
        accessorKey: "status",
        header: () => <div className="text-center font-medium whitespace-nowrap">Status</div>,
        cell: ({ row }) => {
            const status = recreateEnum(parseInt(row.getValue("status")));
            return (
                <Trans i18nKey={'webapp.loanStatus.loanColumn.' + status?.id} components={{
                    status: <div className="text-center font-medium"/>
                }}>
                    {status?.fallbackDescription}
                </Trans>
            )
        }
    },
    {
        accessorKey: "interestRate",
        header: () => <div className="text-center font-medium whitespace-nowrap">Juros (% a.m)</div>,
        cell: ({ row }) => <div className="text-center font-medium">{(parseFloat(row.getValue("interestRate")) * 100) + "%"}</div>
    },
    {
        accessorKey: "interestAmount",
        header: () => <div className="text-center font-medium whitespace-nowrap">Juros (R$)</div>,
        cell: ({row}) => {
            const loanAmount = parseFloat(row.getValue("loanAmount"));
            const interestRate = parseFloat(row.getValue("interestRate"));
            const installments = parseInt(row.getValue("installments"));
            const interestAmount = (Math.pow((interestRate + 1), installments) * loanAmount) - loanAmount;
            const formatted = new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
            }).format(interestAmount);
            //Levar em consideração mais na frente se está pendente de dívida
            return <div className="text-center font-medium">{formatted}</div>
        }
    },
    {
        accessorKey: "totalDebtAmount",
        header: () => <div className="text-center font-medium whitespace-nowrap">Dívida Total (R$)</div>,
        cell: ({ row }) => {
            const loanAmount = parseFloat(row.getValue("loanAmount"));
            const interestRate = parseFloat(row.getValue("interestRate"));
            const installments = parseInt(row.getValue("installments"));
            const totalDebtAmount = Math.pow((interestRate + 1), installments) * loanAmount;
            const formatted = new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
            }).format(totalDebtAmount);
            //Levar em consideração mais na frente se está pendente de dívida
            return <div className="text-center font-medium">{formatted}</div>
        }
    },
    {
        accessorKey: "dailyFine",
        header: () => <div className="text-center font-medium whitespace-nowrap">Multa Diária (%)</div>,
        cell: ({ row }) => <div className="text-center font-medium">{row.getValue("dailyFine")}</div>
    },
    {
        accessorKey: "installments",
        header: () => <div className="text-center font-medium whitespace-nowrap">Parcelas</div>,
        cell: ({ row }) => <div className="text-center font-medium">{row.getValue("installments")}</div>
    },
    {
        accessorKey: "installmentsPayed",
        header: () => <div className="text-center font-medium whitespace-nowrap">Parcelas Quitadas</div>,
        cell: ({ row }) => <div className="text-center font-medium">{row.getValue("installmentsPayed")}</div>
    },
    {
        accessorKey: "toReceiveInterestAmount",
        header: () => <div className="text-center font-medium whitespace-nowrap">Rec. Juros</div>,
        cell: ({ row }) => {
            const loanAmount = parseFloat(row.getValue("loanAmount"));
            const interestRate = parseFloat(row.getValue("interestRate"));
            const installments = parseInt(row.getValue("installments"));
            const interestAmount = (Math.pow((interestRate + 1), installments) * loanAmount) - loanAmount;
            const installmentsPayed = parseInt(row.getValue("installmentsPayed"));
            const toReceiveInterestAmount = (installmentsPayed / installments) * interestAmount;
            const formatted = new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
            }).format(toReceiveInterestAmount);
            //Levar em consideração mais na frente se está pendente de dívida
            return <div className="text-center font-medium">{formatted}</div>
        }
    },
    {
        accessorKey: "pastDueAmount",
        header: () => <div className="text-center font-medium whitespace-nowrap">Atrasado</div>, //mostrar tooltip, descrevendo que inclui parcelas atrasadas e multa diária
        cell: ({ row }) => <div className="text-center font-medium">{row.getValue("pastDueAmount")}</div>
    },
    {
        accessorKey: "currentDebtAmount",
        header: () => <div className="text-center font-medium whitespace-nowrap">Dívida Atual</div>, //mostrar tooltip, descrevendo que inclui parcelas atrasadas com multa diária e parcelas restantes
        cell: ({ row }) => {
            const loanAmount = parseFloat(row.getValue("loanAmount"));
            const interestRate = parseFloat(row.getValue("interestRate"));
            const installments = parseInt(row.getValue("installments"));
            const totalDebtAmount = Math.pow((interestRate + 1), installments) * loanAmount;
            const installmentsPayed = parseInt(row.getValue("installmentsPayed"));
            const currentDebtAmount = ((installments - installmentsPayed) / installments) * totalDebtAmount
            const formatted = new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
            }).format(currentDebtAmount);
            //Levar em consideração mais na frente se está pendente de dívida
            return <div className="text-center font-medium">{formatted}</div>
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const loan = row.original;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(loan.id.toString())}
                        >
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    }
]