"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
    id: string
    loanDate: Date
    clientName: string
    loanAmount: number
    interestRate: number //mensal
    interestAmount: number
    totalDebtAmount: number
    dailyFine: number
    installments: number
    installmentsPayed: number
    toReceiveInterestAmount: number
    pastDueAmount: number
    currentDebtAmount: number
    status: "goodStanding" | "pastDue" | "default" | "paidOff" //pendente,
}

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "loanDate",
        header: "Data Emprést.",
    },
    {
        accessorKey: "clientName",
        header: "Nome Cliente",
    },
    {
        accessorKey: "loanAmount",
        header: "Valor Empréstimo",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        accessorKey: "interestRate",
        header: "Juros (% ao mês)",
    },
    {
        accessorKey: "interestAmount",
        header: "Juros (R$)",
    },
    {
        accessorKey: "totalDebtAmount",
        header: "Dívida Total",
    },
    {
        accessorKey: "dailyFine",
        header: "Multa Diária (%)",
    },
    {
        accessorKey: "installments",
        header: "Parcelas",
    },
    {
        accessorKey: "installmentsPayed",
        header: "Parcelas Quitadas",
    },
    {
        accessorKey: "toReceiveInterestAmount",
        header: "Rec. Juros",
    },
    {
        accessorKey: "pastDueAmount",
        header: "Atrasado",  //mostrar tooltip, descrevendo que inclui parcelas atrasadas e multa diária
    },
    {
        accessorKey: "currentDebtAmount",
        header: "Dívida Atual", //mostrar tooltip, descrevendo que inclui parcelas atrasadas com multa diária e parcelas restantes
    }
]

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
  }

export function LoanDataTable<TData, TValue>({ columns, data, }: Readonly<DataTableProps<TData, TValue>>) {
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className="rounded-md border">
            <Table>
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                    return (
                        <TableHead key={header.id}>
                        {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                            )}
                        </TableHead>
                    )
                    })}
                </TableRow>
                ))}
            </TableHeader>
            <TableBody>
                {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                    <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                    >
                    {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                    ))}
                    </TableRow>
                ))
                ) : (
                <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                    </TableCell>
                </TableRow>
                )}
            </TableBody>
            </Table>
        </div>
    )
}