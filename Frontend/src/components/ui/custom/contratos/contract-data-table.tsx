import { contractDataTableColumns } from './contract-data-table-columns';
import { DataTable } from './data-table';
import { useEffect, useState } from 'react';
import {
    SortingState,
    ColumnFiltersState,
    VisibilityState,
    PaginationState
} from "@tanstack/react-table";
import { useGetContractListPaginated } from '@/hooks/use-get-contract-list-paginated';

//criar tabela para historico de atrasos de emprestimo, ter um campo para mês fixo e atraso acumulado
//consultar a tabela para obter dívida total, e valor total de atraso

export function ContractDataTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const [pagination, setPagination] = useState<PaginationState>({
      pageIndex: 0,
      pageSize: 10,
  });

  const dataQuery = useGetContractListPaginated(pagination, sorting, columnFilters);

  useEffect(()=>{
      dataQuery.refetch();
  }, [sorting, columnFilters]);

  return <DataTable
      columns={contractDataTableColumns}
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