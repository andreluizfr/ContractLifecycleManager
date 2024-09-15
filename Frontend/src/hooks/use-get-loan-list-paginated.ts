import { LoanDTO } from "@/components/ui/custom/loan-data-table-columns";
import { makeHttpClient } from "@/factories/makeHttpClient";
import { useQuery } from "@tanstack/react-query";
import { ColumnFiltersState, PaginationState, SortingState } from "@tanstack/react-table";

interface IPaginatedContractsResult {
    results: LoanDTO[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
}

interface IPaginatedRequestBody extends PaginationState {
    sorting: SortingState,
    columnFilters: ColumnFiltersState
}

export const useGetLoanListPaginated = (pagination: PaginationState, sorting: SortingState, columnFilters: ColumnFiltersState) => {

    const paginatedRequestBody: IPaginatedRequestBody = {
        ...pagination,
        sorting,
        columnFilters
    }

    const queryResult = useQuery({
        queryKey: ['loanListPaginated', JSON.stringify(pagination)],
        queryFn: async () => getLoanListPaginated(paginatedRequestBody),
        staleTime: 3 * 60 * 60 * 1000, //colocar o tempo que dura o signed cookie
        gcTime: 24 * 60 * 60 * 1000,
    });

    return queryResult; //para fazer o devido uso com relação a camada de view do react
}

export async function getLoanListPaginated (paginatedRequestBody: IPaginatedRequestBody) {

    const httpClient = makeHttpClient<IPaginatedContractsResult>();

    return (await httpClient.post("/contract/paginatedContracts", paginatedRequestBody)).data;
}