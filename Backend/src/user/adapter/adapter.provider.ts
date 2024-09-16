import { Provider } from "@nestjs/common"
import { UserPersistensePort } from "src/user/application/ports/out/userPersistense.port"
import { UserPersistenseAdapter } from "src/user/adapter/out/user-persistence.adapter";
import { UserMapper } from "src/user/adapter/out/user-mapper";

export const ServicesOut: Provider[] = [
  {
    provide: UserPersistensePort,
    useClass: UserPersistenseAdapter
  },
  UserMapper,
]