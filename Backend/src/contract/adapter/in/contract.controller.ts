import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ContractUseCase } from 'src/contract/application/ports/in/contract.useCase';
import { LoadPaginatedContractsDTO } from 'src/contract/domain/dtos/loadPaginatedContractsDTO';
import { SaveContractDTO } from 'src/contract/domain/dtos/saveContractDTO';

@Controller()
export class ContractController {
  constructor(private readonly contractUseCase: ContractUseCase) {}

  @Post('/contract/save')
  @UsePipes(new ValidationPipe({ transform: true }))
  async save(@Body() request: SaveContractDTO) {
    const data = await this.contractUseCase.saveContract(request.toContract());
    return {
      data,
      message: "salvo com sucesso!"
    };
  }

  @Post('/contract/paginatedContracts')
  @UsePipes(new ValidationPipe({ transform: true }))
  async load(@Body() request: LoadPaginatedContractsDTO) {
    const data = await this.contractUseCase.loadPaginatedContracts(request);
    return {
      data,
      message: "listagem feita com sucesso!"
    };
  }
}
