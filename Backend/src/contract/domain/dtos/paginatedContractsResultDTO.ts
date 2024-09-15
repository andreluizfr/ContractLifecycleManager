import { Contract } from "../models/contract";

export class PaginatedContractsResultDTO {
  results: Contract[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}