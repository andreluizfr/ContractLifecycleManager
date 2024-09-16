import { Provider } from "@nestjs/common"
import { UserUseCase } from "src/user/application/ports/in/user.useCase"
import { UserService } from "src/user/application/services/user.service"

export const Services: Provider[] = [
  {
    provide: UserUseCase,
    useClass: UserService
  }
]