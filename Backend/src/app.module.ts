import { forwardRef, Module, OnModuleInit } from '@nestjs/common';

import { PersistenceModule } from 'src/persistence/persistence.module';
import { SeedService } from 'src/persistence/seed.service';

import { Services as UserServices } from 'src/user/application/ports/ports.provider';
import { AdapterModule as UserAdapterModule } from 'src/user/adapter/adapter.module';

import { Services as ContractServices } from 'src/contract/application/ports/ports.provider';
import { AdapterModule as ContractAdapterModule } from 'src/contract/adapter/adapter.module';

import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PersistenceModule,
    forwardRef(() => UserAdapterModule),
    forwardRef(() => ContractAdapterModule),
  ],
  providers: [...UserServices, ...ContractServices],
  exports: [...UserServices, ...ContractServices]
})

export class AppModule implements OnModuleInit {
  constructor(private readonly seedService: SeedService) {}

  async onModuleInit() {
    await this.seedService.populateDatabase();
  }
}