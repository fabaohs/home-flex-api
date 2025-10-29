import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { UserRepository } from './shared/repositories/user.repository';
import { DrizzleModule } from './configurations/drizzle/drizzle.module';

@Module({
  imports: [AuthModule],
  controllers: [AppController],
  providers: [UserRepository, DrizzleModule],
})
export class AppModule {}
