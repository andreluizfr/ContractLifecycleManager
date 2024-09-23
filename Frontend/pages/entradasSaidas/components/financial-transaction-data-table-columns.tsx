import { ColumnDef } from "@tanstack/react-table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import DataTableColumnHeader from "@/components/ui/custom/data-table-column-header";
import { FinancialTransaction } from "@/domain/models/FinancialTransaction";
import { Client } from "@/domain/models/Client";
import { Trans } from "react-i18next";

export const financialTransactionDataTableColumns: ColumnDef<FinancialTransaction>[] = [
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
        accessorKey: "client",
        header: ({ column }) => <DataTableColumnHeader column={column} i18nKey='webapp.financialTransactionColumn.client'/>,
        cell: ({ row }) => <div className="text-center text-muted-foreground">{row.getValue<Client>("client")._id}</div>
    },
    {
        id: "clientName",
        accessorKey: "clientName",
        header: ({ column }) => <DataTableColumnHeader column={column} i18nKey='webapp.financialTransactionColumn.clientName'/>,
        cell: ({ row }) => <div className="text-center text-muted-foreground">{row.getValue<Client>("client").name}</div>
    },
    {
        accessorKey: "transactionMethod",
        header: ({ column }) => <DataTableColumnHeader column={column} i18nKey='webapp.financialTransactionColumn.transactionMethod'/>,
        cell: ({ row }) =>
            <div className="text-center text-muted-foreground">
                <Trans i18nKey={"webapp.transactionMethod."+row.getValue("transactionMethod")}/>
            </div>
    },
    {
        accessorKey: "amount",
        header: ({ column }) => <DataTableColumnHeader column={column} i18nKey='webapp.financialTransactionColumn.amount'/>,
        cell: ({ row }) => <div className="text-center text-muted-foreground">{row.getValue("amount")}</div>
    },
    {
        accessorKey: "observations",
        header: ({ column }) => <DataTableColumnHeader column={column} i18nKey='webapp.financialTransactionColumn.observations'/>,
        cell: ({ row }) => <div className="text-center text-muted-foreground">{row.getValue("observations")}</div>
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const financialTransaction = row.original;
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
                        <DropdownMenuItem>
                            <span className="w-full cursor-pointer">Ver detalhes da transação</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <span className="w-full cursor-pointer">Editar</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <span className="w-full cursor-pointer">Excluir</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    }
]