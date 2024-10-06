import { useQuery } from "@tanstack/react-query";
import { ColumnFiltersState, PaginationState, SortingState } from "@tanstack/react-table";
import { IPaginatedRequestBody, IPaginatedResult } from "@/domain/dto/IPaginatedResult";
import { Client } from "@/domain/models/Client";
import { useHttpClient } from "./useHttpClient";
import { IHttpClient } from "@/infrastructure/httpClient/IHttpClient";

export const useGetClientListPaginated = (pagination: PaginationState, sorting: SortingState, columnFilters: ColumnFiltersState) => {

  const httpClient = useHttpClient<IPaginatedResult<Client>>();

  const paginatedRequestBody: IPaginatedRequestBody = {
    ...pagination,
    sorting,
    columnFilters
  }

  const queryResult = useQuery({
    queryKey: ['clientListPaginated', JSON.stringify(pagination)],
    queryFn: async () => getClientListPaginated(httpClient, paginatedRequestBody),
    staleTime: 3 * 60 * 60 * 1000, //colocar o tempo que dura o signed cookie
    gcTime: 24 * 60 * 60 * 1000,
  });

  return queryResult; //para fazer o devido uso com relação a camada de view do react
}

export async function getClientListPaginated (httpClient: IHttpClient<IPaginatedResult<Client>>, paginatedRequestBody: IPaginatedRequestBody) {
  return (await httpClient.post("/client/paginatedClients", paginatedRequestBody)).data;
}