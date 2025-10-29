import { Global, Module } from '@nestjs/common';
import { DrizzleAsyncProvider, drizzleProvider } from './db-provider';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  providers: [...drizzleProvider],
  imports: [ConfigModule],
  exports: [DrizzleAsyncProvider],
})
export class DrizzleModule {}
