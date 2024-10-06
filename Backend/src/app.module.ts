import { forwardRef, Module, OnModuleInit } from '@nestjs/common';

import { PersistenceModule } from 'src/persistence/persistence.module';
import { SeedService } from 'src/persistence/seed.service';

import { Services as UserServices } from 'src/user/application/ports/ports.provider';
import { AdapterModule as UserAdapterModule } from 'src/user/adapter/adapter.module';

import { Services as ContractServices } from 'src/contract/application/ports/ports.provider';
import { AdapterModule as ContractAdapterModule } from 'src/contract/adapter/adapter.module';

import { Services as AuthServices } from 'src/auth/application/ports/ports.provider';
import { AdapterModule as AuthAdapterModule } from 'src/auth/adapter/adapter.module';

import { ConfigModule } from '@nestjs/config';
import { DevtoolsModule } from '@nestjs/devtools-integration';

@Module({
  imports: [
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PersistenceModule,
    forwardRef(() => UserAdapterModule),
    forwardRef(() => ContractAdapterModule),
    forwardRef(() => AuthAdapterModule),
  ],
  providers: [...UserServices, ...ContractServices, ...AuthServices],
  exports: [...UserServices, ...ContractServices, ...AuthServices]
})
export class AppModule implements OnModuleInit {
  constructor(private readonly seedService: SeedService) {}

  async onModuleInit() {
    await this.seedService.populateDatabase();
  }
}