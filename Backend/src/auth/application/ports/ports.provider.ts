import { Provider } from "@nestjs/common"
import { AuthUseCase } from "src/auth/application/ports/in/auth.useCase"
import { AuthService } from "src/auth/application/services/auth.service"
import { GoogleStrategy } from "src/auth/utils/GoogleStrategy"

export const Services: Provider[] = [
  {
    provide: AuthUseCase,
    useClass: AuthService
  },
  GoogleStrategy
]