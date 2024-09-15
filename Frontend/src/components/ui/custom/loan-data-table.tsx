import { loanDataTableColumns } from './loan-data-table-columns';
import { DataTable } from './data-table';
import { useEffect, useState } from 'react';
import {
    SortingState,
    ColumnFiltersState,
    VisibilityState,
    PaginationState
} from "@tanstack/react-table";
import { useGetLoanListPaginated } from '@/hooks/use-get-loan-list-paginated';

//criar tabela para historico de atrasos de emprestimo, ter um campo para mês fixo e atraso acumulado
//consultar a tabela para obter dívida total, e valor total de atraso

export function LoanDataTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const [pagination, setPagination] = useState<PaginationState>({
      pageIndex: 0,
      pageSize: 10,
  });

  const dataQuery = useGetLoanListPaginated(pagination, sorting, columnFilters);

  useEffect(()=>{
      console.log({sorting, columnFilters});
      dataQuery.refetch();
  }, [sorting, columnFilters]);

  useEffect(()=>{
    console.log(dataQuery.data);
}, [dataQuery.data]);

  return <DataTable
      columns={loanDataTableColumns}
      data={dataQuery.data?.results ?? []}
      rowCount={dataQuery.data?.totalCount ?? 0}
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