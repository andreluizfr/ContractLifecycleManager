"use client";

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    SortingState,
    ColumnFiltersState,
    getFilteredRowModel,
    VisibilityState,
    PaginationState
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction, useEffect } from "react";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import { DataTablePagination } from "../data-table-pagination";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    rowCount: number,
    pagination: PaginationState,
    setPagination: Dispatch<SetStateAction<PaginationState>>,
    sorting: SortingState,
    setSorting: Dispatch<SetStateAction<SortingState>>,
    columnFilters: ColumnFiltersState,
    setColumnFilters: Dispatch<SetStateAction<ColumnFiltersState>>,
    columnVisibility: VisibilityState,
    setColumnVisibility: Dispatch<SetStateAction<VisibilityState>>,
    rowSelection: {},
    setRowSelection: Dispatch<SetStateAction<{}>>
}

export function DataTable<TData, TValue>({
    data,
    rowCount,
    columns,
    pagination,
    setPagination,
    sorting,
    setSorting,
    columnFilters,
    setColumnFilters,
    columnVisibility,
    setColumnVisibility,
    rowSelection,
    setRowSelection
}: Readonly<DataTableProps<TData, TValue>>) {

    useEffect(()=>{
        console.log(data);
    }, [data]);

    const { t } = useTranslation();

    const table = useReactTable({
        data: data,
        columns,
        rowCount: rowCount,
        manualPagination: true,
        getCoreRowModel: getCoreRowModel(),
        onPaginationChange: setPagination,
        onSortingChange: setSorting, //pode remover se não precisar de ordenação
        onColumnFiltersChange: setColumnFilters, //pode remover se não precisar de filtros
        getFilteredRowModel: getFilteredRowModel(), //pode remover se não precisar de filtros
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,  //adiciona um checkbox em cada pra cada linha e um no header para selecionar todos
        state: {
            pagination,
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection
        },
        debugTable: true,
        debugHeaders: true,
        debugColumns: true,
    });

    return (
        <div className="flex flex-col w-full overflow-hidden rounded-[0.5rem] border bg-background shadow p-4">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filtre clientes..."
                    value={(table.getColumn("clientName")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("clientName")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm shadow-sm"
                />
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto shadow-sm">
                            Colunas
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter(
                                (column) => column.getCanHide()
                            )
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {t('webapp.loanColumn.' + column.id)}
                                    </DropdownMenuCheckboxItem>
                                )
                            })
                        }
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                        return (
                            <TableHead key={header.id} className="text-primary">
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
                            <TableCell key={cell.id} onClick={() => console.info(cell.column.id)}>
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
            <div className="flex text-sm justify-between">

                <DataTablePagination table={table}/>

                <div className="flex items-center justify-end space-x-2 py-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}