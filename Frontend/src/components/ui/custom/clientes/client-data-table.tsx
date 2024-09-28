import { clientDataTableColumns } from './client-data-table-columns';
import { DataTable } from './data-table';
import { useEffect, useState } from 'react';
import {
    SortingState,
    ColumnFiltersState,
    VisibilityState,
    PaginationState
} from "@tanstack/react-table";
import { useGetClientListPaginated } from '@/hooks/use-get-client-list-paginated';
import { Client } from '@/domain/models/Client';

const clients: Client[] = [
  {
    _id: "1",
    name: "André",
    phoneNumber: "(81) 98753-9588",
    cpf: "049.908.514-04",
    rg: "9.347.203",
    address: "Rua Papa João Paulo I, 515, Nossa Senhora do Ó",
    pixKey: "3i34v3490bng3-n0b3945n-3mvpp",
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
    observations: "Nada a declarar..."
  },
  {
    _id: "2",
    name: "André",
    phoneNumber: "(81) 98753-9588",
    cpf: "049.908.514-04",
    rg: "9.347.203",
    address: "Rua Papa João Paulo I, 515, Nossa Senhora do Ó",
    pixKey: "3i34v3490bng3-n0b3945n-3mvpp",
    bankAccount: null,
    observations: "Nada a declarar..."
  },
  {
    _id: "3",
    name: "André",
    phoneNumber: "(81) 98753-9588",
    cpf: "049.908.514-04",
    rg: "9.347.203",
    address: "Rua Papa João Paulo I, 515, Nossa Senhora do Ó",
    pixKey: "v34954y54h50bng3-n0b38k67k-3mvpp",
    bankAccount: null,
    observations: "Nada a declarar..."
  }
]

export function ClientDataTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const dataQuery = useGetClientListPaginated(pagination, sorting, columnFilters);

  useEffect(()=>{
    console.log({sorting, columnFilters});
    dataQuery.refetch();
  }, [sorting, columnFilters]);

  useEffect(()=>{
    console.log(dataQuery.data);
}, [dataQuery.data]);

  return <DataTable
      columns={clientDataTableColumns}
      //data={dataQuery.data?.results ?? []}
      //rowCount={dataQuery.data?.totalCount ?? 0}
      data={dataQuery.data?.results ?? clients}
      rowCount={dataQuery.data?.totalCount ?? 3}
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