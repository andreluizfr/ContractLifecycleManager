import { loanDataTableColumns, LoanDTO } from './loan-data-table-columns';
import { DataTable } from './data-table';
import { useEffect, useState } from 'react';
import {
    SortingState,
    ColumnFiltersState,
    VisibilityState
} from "@tanstack/react-table";

//criar mapper que cria esse DTO apartir de um loan

async function getData(): Promise<LoanDTO[]> {
    // Fetch data from your API here.
    return [
        {
            id: 1,
            loanDate: (new Date()).toLocaleString().split(",")[0],
            clientName: "André Luiz",
            loanAmount: 20000,
            interestRate: 0.02,
            dailyFine: 0.01,
            installments: 4,
            installmentsPayed: 1,
            pastDueAmount: 0,
            status: 1
        },
        {
            id: 1,
            loanDate: (new Date()).toLocaleString().split(",")[0],
            clientName: "André Luiz",
            loanAmount: 30000,
            interestRate: 0.02,
            dailyFine: 0.01,
            installments: 5,
            installmentsPayed: 2,
            pastDueAmount: 0,
            status: 1
        }
    ]
}

//criar tabela para historico de atrasos de emprestimo, ter um campo para mês fixo e atraso acumulado
//consultar a tabela para obter dívida total, e valor total de atraso

export function LoanDataTable() {
    const [data, setData] = useState<LoanDTO[]>();
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});

    useEffect(()=>{
        (async function() {
            const data = await getData();
            setData(data);
        })();
    }, []);

    if (!data) return <></>;

    return <DataTable
        columns={loanDataTableColumns}
        data={data}
        sorting={sorting}
        setSorting={setSorting}
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
        columnVisibility={columnVisibility}
        setColumnVisibility={setColumnVisibility}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
    />
}