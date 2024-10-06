import { useQuery } from "@tanstack/react-query";
import { ColumnFiltersState, PaginationState, SortingState } from "@tanstack/react-table";
import { useHttpClient } from "./useHttpClient";
import { IPaginatedResult } from "@/domain/dto/IPaginatedResult";
import { Client } from "@/domain/models/Client";
import { IHttpClient } from "@/infrastructure/httpClient/IHttpClient";

interface IPaginatedRequestBody extends PaginationState {
  sorting: SortingState,
  columnFilters: ColumnFiltersState
}

export const useGetContractListPaginated = (pagination: PaginationState, sorting: SortingState, columnFilters: ColumnFiltersState) => {

  const httpClient = useHttpClient<IPaginatedResult<Client>>();

  const paginatedRequestBody: IPaginatedRequestBody = {
    ...pagination,
    sorting,
    columnFilters
  }

  const queryResult = useQuery({
    queryKey: ['contractListPaginated', JSON.stringify(pagination)],
    queryFn: async () => getContractListPaginated(httpClient, paginatedRequestBody),
    staleTime: 3 * 60 * 60 * 1000, //colocar o tempo que dura o signed cookie
    gcTime: 24 * 60 * 60 * 1000,
  });

  return queryResult; //para fazer o devido uso com relação a camada de view do react
}

export async function getContractListPaginated (httpClient: IHttpClient<IPaginatedResult<Client>>, paginatedRequestBody: IPaginatedRequestBody) {
  return (await httpClient.post("/contract/paginatedContracts", paginatedRequestBody)).data;
}