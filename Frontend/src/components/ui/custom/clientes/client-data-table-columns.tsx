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
import DataTableColumnHeader from "../data-table-column-header";
import { SaveClient } from './save-client'
import { EditMessage } from "./edit-message";
import { Client } from "@/domain/models/Client";
import { BankAccount } from "@/domain/models/BankAccount";

export const clientDataTableColumns: ColumnDef<Client>[] = [
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
        accessorKey: "_id",
        header: ({ column }) => <DataTableColumnHeader column={column} i18nKey='webapp.clientColumn._id'/>,
        cell: ({ row }) => <div className="text-center text-muted-foreground">{row.getValue("_id")}</div>
    },
    {
        accessorKey: "name",
        header: ({ column }) => <DataTableColumnHeader column={column} i18nKey='webapp.clientColumn.name'/>,
        cell: ({ row }) => <div className="text-center text-muted-foreground">{row.getValue("name")}</div>
    },
    {
        accessorKey: "phoneNumber",
        header: ({ column }) => <DataTableColumnHeader column={column} i18nKey='webapp.clientColumn.phoneNumber'/>,
        cell: ({ row }) => <div className="text-center text-muted-foreground">{row.getValue("phoneNumber")}</div>
    },
    {
        accessorKey: "cpf",
        header: ({ column }) => <DataTableColumnHeader column={column} i18nKey='webapp.clientColumn.cpf'/>,
        cell: ({ row }) => <div className="text-center text-muted-foreground">{row.getValue("cpf")}</div>
    },
    {
        accessorKey: "rg",
        header: ({ column }) => <DataTableColumnHeader column={column} i18nKey='webapp.clientColumn.rg'/>,
        cell: ({ row }) => <div className="text-center text-muted-foreground">{row.getValue("rg")}</div>
    },
    {
        accessorKey: "address",
        header: ({ column }) => <DataTableColumnHeader column={column} i18nKey='webapp.clientColumn.address'/>,
        cell: ({ row }) => <div className="text-center text-muted-foreground">{row.getValue("address")}</div>
    },
    {
        accessorKey: "pixKey",
        header: ({ column }) => <DataTableColumnHeader column={column} i18nKey='webapp.clientColumn.pixKey'/>,
        cell: ({ row }) => <div className="text-center text-muted-foreground">{row.getValue("pixKey")}</div>
    },
    {
        accessorKey: "bankName",
        header: ({ column }) => <DataTableColumnHeader column={column} i18nKey='webapp.clientColumn.bankName'/>,
        cell: ({ row }) => <div className="text-center text-muted-foreground">{row.getValue<BankAccount>("bankAccount")?.financialInstitution.description}</div>
    },
    {
        accessorKey: "bankAgence",
        header: ({ column }) => <DataTableColumnHeader column={column} i18nKey='webapp.clientColumn.bankAgence'/>,
        cell: ({ row }) => <div className="text-center text-muted-foreground">{row.getValue<BankAccount>("bankAccount")?.agence}</div>
    },
    {
        accessorKey: "bankAccount",
        header: ({ column }) => <DataTableColumnHeader column={column} i18nKey='webapp.clientColumn.bankAccount'/>,
        cell: ({ row }) => <div className="text-center text-muted-foreground">{row.getValue<BankAccount>("bankAccount")?.account}</div>
    },
    {
        accessorKey: "observations",
        header: ({ column }) => <DataTableColumnHeader column={column} i18nKey='webapp.clientColumn.observations'/>,
        cell: ({ row }) => <div className="text-center text-muted-foreground">{row.getValue("observations")}</div>
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const client = row.original;
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
                            onClick={() => navigator.clipboard.writeText(String(client.pixKey))}
                        >
                            <span className="w-full cursor-pointer">Copiar Chave Pix</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <EditMessage />
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <SaveClient client={row.original}/>
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