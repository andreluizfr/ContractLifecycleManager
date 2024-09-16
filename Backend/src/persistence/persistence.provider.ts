import { Provider, Scope } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';

import { MongoDatabaseService } from "./mongo-database-service";

export const Persistence: Provider[] = [
  {
    provide: 'MongoDatabaseService',
    scope: Scope.DEFAULT,
    useFactory: async (configService: ConfigService) => {
      const mongoDatabaseService = new MongoDatabaseService(configService);
      const response = await mongoDatabaseService.connect();
      console.log(response);
      return mongoDatabaseService;
    },
    inject: [ConfigService]
  }
]