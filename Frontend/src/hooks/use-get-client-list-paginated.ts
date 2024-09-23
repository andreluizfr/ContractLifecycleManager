import { makeHttpClient } from "@/factories/makeHttpClient";
import { useQuery } from "@tanstack/react-query";
import { ColumnFiltersState, PaginationState, SortingState } from "@tanstack/react-table";
import { IPaginatedRequestBody, IPaginatedResult } from "@/domain/dto/IPaginatedResult";
import { Client } from "@/domain/models/Client";

export const useGetClientListPaginated = (pagination: PaginationState, sorting: SortingState, columnFilters: ColumnFiltersState) => {

    const paginatedRequestBody: IPaginatedRequestBody = {
        ...pagination,
        sorting,
        columnFilters
    }

    const queryResult = useQuery({
        queryKey: ['clientListPaginated', JSON.stringify(pagination)],
        queryFn: async () => getClientListPaginated(paginatedRequestBody),
        staleTime: 3 * 60 * 60 * 1000, //colocar o tempo que dura o signed cookie
        gcTime: 24 * 60 * 60 * 1000,
    });

    return queryResult; //para fazer o devido uso com relação a camada de view do react
}

export async function getClientListPaginated (paginatedRequestBody: IPaginatedRequestBody) {

    const httpClient = makeHttpClient<IPaginatedResult<Client>>();

    return (await httpClient.post("/client/paginatedClients", paginatedRequestBody)).data;
}