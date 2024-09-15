import { Inject, Injectable } from "@nestjs/common";
import { ContractPersistensePort } from "src/contract/application/ports/out/contractPersistense.port";
import { ContractMapper } from "./contract-mapper";
import { Contract } from "src/contract/domain/models/contract";
import { ContractDocument, ContractModel, ContractSchema } from "./contract.schema";
import { LoadPaginatedContractsDTO } from "src/contract/domain/dtos/loadPaginatedContractsDTO";
import { MongoDatabaseService } from "src/persistence/mongo-database-service";
import { PaginatedContractsResultDTO } from "src/contract/domain/dtos/paginatedContractsResultDTO";

@Injectable()
export class ContractPersistenceAdapter implements ContractPersistensePort {
  constructor(private contractMapper: ContractMapper, @Inject('MongoDatabaseService') private readonly mongoDatabaseService: MongoDatabaseService) {}

  async persistContract(contract: Partial<Contract>): Promise<ContractDocument> {
    const contractModel = this.contractMapper.toModel(contract);
    return contractModel.save();
  }

  async loadPaginatedContracts(contracts: LoadPaginatedContractsDTO): Promise<PaginatedContractsResultDTO> {

    const { pageIndex, pageSize, sorting, columnFilters } = contracts;

    // Definir a página e o limite
    const skip = pageIndex * pageSize;
    const limit = pageSize;

    // Criar a query de filtros dinâmicos
    const filters = columnFilters.reduce((acc, filter) => {
      if (filter.value !== undefined && filter.value !== null) {
        acc[filter.id] = filter.value;
      }
      return acc;
    }, {});

    // Criar a ordenação
    const sort = sorting.reduce((acc, sortItem) => {
        acc[sortItem.id] = sortItem.desc ? -1 : 1;
        return acc;
    }, {});

    // Montar a consulta paginada
    const Contract: ContractModel = this.mongoDatabaseService.conn.connection.model<ContractDocument>('Contract', ContractSchema);
    const results = await Contract.find(filters)
        .sort(sort)
        .skip(skip)
        .limit(limit);

    // Obter a contagem total de resultados para paginação
    const totalCount = await Contract.countDocuments(filters);

    return {
      results,
      totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
      currentPage: pageIndex,
    };
  }
}