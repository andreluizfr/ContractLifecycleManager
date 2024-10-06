import { IPaginatedRequestBody, IPaginatedResult } from "@/domain/dto/IPaginatedResult";
import { FinancialTransaction } from "@/domain/models/FinancialTransaction";
import { useQuery } from "@tanstack/react-query";
import { ColumnFiltersState, PaginationState, SortingState } from "@tanstack/react-table";
import { useHttpClient } from "./useHttpClient";
import { IHttpClient } from "@/infrastructure/httpClient/IHttpClient";

export const useGetExitListPaginated = (pagination: PaginationState, sorting: SortingState, columnFilters: ColumnFiltersState) => {

  const httpClient = useHttpClient<IPaginatedResult<FinancialTransaction>>();

  const paginatedRequestBody: IPaginatedRequestBody = {
    ...pagination,
    sorting,
    columnFilters
  }

  const queryResult = useQuery({
    queryKey: ['exitListPaginated', JSON.stringify(pagination)],
    queryFn: async () => getExitListPaginated(httpClient, paginatedRequestBody),
    staleTime: 3 * 60 * 60 * 1000, //colocar o tempo que dura o signed cookie
    gcTime: 24 * 60 * 60 * 1000,
  });

  return queryResult; //para fazer o devido uso com relação a camada de view do react
}

export async function getExitListPaginated (httpClient: IHttpClient<IPaginatedResult<FinancialTransaction>>, paginatedRequestBody: IPaginatedRequestBody) {
  return (await httpClient.post("/financialTransaction/paginatedExitTransactions", paginatedRequestBody)).data;
}