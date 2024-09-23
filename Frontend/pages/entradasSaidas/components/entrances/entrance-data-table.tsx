import { FinancialTransaction, TransactionMethod, TransactionType } from "@/domain/models/FinancialTransaction";
import { DataTable } from "../data-table";
import { financialTransactionDataTableColumns } from "../financial-transaction-data-table-columns";
import { useEffect, useState } from "react";
import { ColumnFiltersState, PaginationState, SortingState, VisibilityState } from "@tanstack/react-table";
import { useGetEntranceListPaginated } from "@/hooks/use-get-entrance-list-paginated";

const entrances: FinancialTransaction[] = [
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
    transactionType: TransactionType.ENTRANCE,
    transactionMethod: TransactionMethod.PIX,
    amount: 100,
    pixKey: "string",
    observations: "string"
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
    transactionType: TransactionType.ENTRANCE,
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
    observations: "string"
  }
];

export default function EntranceDataTable () {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const dataQuery = useGetEntranceListPaginated(pagination, sorting, columnFilters);

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
      data={dataQuery.data?.results ?? entrances}
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