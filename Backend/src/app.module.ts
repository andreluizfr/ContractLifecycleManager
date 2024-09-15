import { forwardRef, Module } from '@nestjs/common';

import { PersistenceModule } from './persistence/persistence.module';

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
export class AppModule {}