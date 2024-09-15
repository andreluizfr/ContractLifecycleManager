import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { SaveContractUseCase } from 'src/contract/application/ports/in/saveContract.useCase';
import { SaveContractDTO } from 'src/contract/domain/dtos/saveContractDTO';

@Controller()
export class SaveContractController {
  constructor(private readonly saveContractUseCase: SaveContractUseCase) {}

  @Post('/contract/save')
  @UsePipes(new ValidationPipe({ transform: true }))
  async save(@Body() request: SaveContractDTO) {
    return await this.saveContractUseCase.saveContract(request.toContract());
  }
}
