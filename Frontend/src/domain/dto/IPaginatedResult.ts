import { ColumnFiltersState, PaginationState, SortingState } from "@tanstack/react-table";

export interface IPaginatedResult<T> {
  results: T[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

export interface IPaginatedRequestBody extends PaginationState {
  sorting: SortingState,
  columnFilters: ColumnFiltersState
}