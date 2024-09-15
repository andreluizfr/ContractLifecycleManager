import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoadPaginatedContractsUseCase } from 'src/contract/application/ports/in/loadPaginatedContracts.useCase';
import { LoadPaginatedContractsDTO } from 'src/contract/domain/dtos/loadPaginatedContractsDTO';

@Controller()
export class LoadPaginatedContractsController {
  constructor(private readonly loadPaginatedContractsUseCase: LoadPaginatedContractsUseCase) {}

  @Post('/contract/paginatedContracts')
  @UsePipes(new ValidationPipe({ transform: true }))
  async load(@Body() request: LoadPaginatedContractsDTO) {
    const data = await this.loadPaginatedContractsUseCase.loadPaginatedContracts(request);
    return {
      data,
      message: "listagem feita com sucesso!"
    };
  }
}
