import { IPaginatedRequestBody, IPaginatedResult } from "@/domain/dto/IPaginatedResult";
import { FinancialTransaction } from "@/domain/models/FinancialTransaction";
import { useQuery } from "@tanstack/react-query";
import { ColumnFiltersState, PaginationState, SortingState } from "@tanstack/react-table";
import { useHttpClient } from "./useHttpClient";
import { IHttpClient } from "@/infrastructure/httpClient/IHttpClient";

export const useGetEntranceListPaginated = (pagination: PaginationState, sorting: SortingState, columnFilters: ColumnFiltersState) => {

  const httpClient = useHttpClient<IPaginatedResult<FinancialTransaction>>();

  const paginatedRequestBody: IPaginatedRequestBody = {
    ...pagination,
    sorting,
    columnFilters
  }

  const queryResult = useQuery({
    queryKey: ['entranceListPaginated', JSON.stringify(pagination)],
    queryFn: async () => getEntranceListPaginated(httpClient, paginatedRequestBody),
    staleTime: 3 * 60 * 60 * 1000, //colocar o tempo que dura o signed cookie
    gcTime: 24 * 60 * 60 * 1000,
  });

  return queryResult; //para fazer o devido uso com relação a camada de view do react
}

export async function getEntranceListPaginated (httpClient: IHttpClient<IPaginatedResult<FinancialTransaction>>, paginatedRequestBody: IPaginatedRequestBody) {
  return (await httpClient.post("/financialTransaction/paginatedEntranceTransactions", paginatedRequestBody)).data;
}