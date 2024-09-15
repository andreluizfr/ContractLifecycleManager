import { Global, Module } from '@nestjs/common';
import { Persistence } from './persistence.provider';

@Global()
@Module({
  providers: [...Persistence],
  exports: [...Persistence],
})
export class PersistenceModule {}