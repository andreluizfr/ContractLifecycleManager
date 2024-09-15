import { Provider } from "@nestjs/common"
import { SaveUserUseCase } from "src/user/application/ports/in/saveUser.useCase"
import { SaveUserService } from "src/user/application/services/saveUser.service"

export const Services: Provider[] = [
  {
    provide: SaveUserUseCase,
    useClass: SaveUserService
  }
]