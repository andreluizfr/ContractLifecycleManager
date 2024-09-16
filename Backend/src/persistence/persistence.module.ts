import { Global, Module } from '@nestjs/common';
import { Persistence } from './persistence.provider';
import { SeedService } from './seed.service';

@Global()
@Module({
  providers: [...Persistence, SeedService],
  exports: [...Persistence, SeedService],
})
export class PersistenceModule {}