import { IsNotEmpty } from "class-validator";

export class LoadPaginatedContractsDTO {
  @IsNotEmpty()
  pageIndex: number;

  @IsNotEmpty()
  pageSize: number;

  @IsNotEmpty()
  sorting: {
    desc: boolean;
    id: string;
  }[];

  @IsNotEmpty()
  columnFilters: {
    id: string;
        value: unknown;
  }[];
}