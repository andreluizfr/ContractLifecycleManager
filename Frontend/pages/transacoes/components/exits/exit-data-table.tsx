import { FinancialTransaction, TransactionMethod, TransactionType } from "@/domain/models/FinancialTransaction";
import { ColumnFiltersState, PaginationState, SortingState, VisibilityState } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { financialTransactionDataTableColumns } from "../financial-transaction-data-table-columns";
import { DataTable } from "../data-table";
import { useGetExitListPaginated } from "@/hooks/use-get-exit-list-paginated";


const exits: FinancialTransaction[] = [
  {
    _id: "1",
    client: {
      _id: "string",
      name: "string",
      phoneNumber: "string",
      cpf: "string",
      rg: "string",
      address: "string",
      pixKey: "string",
      bankAccount: {
        _id: "string",
        financialInstitution: {
          _id: "string",
          cod: "string",
          description: "string"
        },
        agence: "string",
        account: "string"
      },
      observations: "string",
    },
    transactionType: TransactionType.EXIT,
    transactionMethod: TransactionMethod.PIX,
    amount: 100,
    pixKey: "string",
    observations: "string",
    user: {
      _id: "string",
      email: "string",
      password: "string"
    }
  },
  {
    _id: "1",
    client: {
      _id: "string",
      name: "string",
      phoneNumber: "string",
      cpf: "string",
      rg: "string",
      address: "string",
      pixKey: "string",
      bankAccount: {
        _id: "string",
        financialInstitution: {
          _id: "string",
          cod: "string",
          description: "string"
        },
        agence: "string",
        account: "string"
      },
      observations: "string",
    },
    transactionType: TransactionType.EXIT,
    transactionMethod: TransactionMethod.PIX,
    amount: 200,
    bank: {
      _id: "string",
      financialInstitution: {
        _id: "string",
        cod: "string",
        description: "string"
      },
      agence: "string",
      account: "string"
    },
    observations: "string",
    user: {
      _id: "string",
      email: "string",
      password: "string"
    }
  }
];

export default function ExitDataTable () {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const dataQuery = useGetExitListPaginated(pagination, sorting, columnFilters);

  useEffect(()=>{
    console.log({sorting, columnFilters});
    dataQuery.refetch();
  }, [sorting, columnFilters]);

  useEffect(()=>{
    console.log(dataQuery.data);
}, [dataQuery.data]);

  return <DataTable
      columns={financialTransactionDataTableColumns}
      //data={dataQuery.data?.results ?? []}
      //rowCount={dataQuery.data?.totalCount ?? 0}
      data={dataQuery.data?.results ?? exits}
      rowCount={dataQuery.data?.totalCount ?? 2}
      pagination={pagination}
      setPagination={setPagination}
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