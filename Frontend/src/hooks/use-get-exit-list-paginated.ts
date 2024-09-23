import { IPaginatedRequestBody, IPaginatedResult } from "@/domain/dto/IPaginatedResult";
import { FinancialTransaction } from "@/domain/models/FinancialTransaction";
import { makeHttpClient } from "@/factories/makeHttpClient";
import { useQuery } from "@tanstack/react-query";
import { ColumnFiltersState, PaginationState, SortingState } from "@tanstack/react-table";

export const useGetExitListPaginated = (pagination: PaginationState, sorting: SortingState, columnFilters: ColumnFiltersState) => {

    const paginatedRequestBody: IPaginatedRequestBody = {
        ...pagination,
        sorting,
        columnFilters
    }

    const queryResult = useQuery({
        queryKey: ['exitListPaginated', JSON.stringify(pagination)],
        queryFn: async () => getExitListPaginated(paginatedRequestBody),
        staleTime: 3 * 60 * 60 * 1000, //colocar o tempo que dura o signed cookie
        gcTime: 24 * 60 * 60 * 1000,
    });

    return queryResult; //para fazer o devido uso com relação a camada de view do react
}

export async function getExitListPaginated (paginatedRequestBody: IPaginatedRequestBody) {

    const httpClient = makeHttpClient<IPaginatedResult<FinancialTransaction>>();

    return (await httpClient.post("/financialTransaction/paginatedExitTransactions", paginatedRequestBody)).data;
}