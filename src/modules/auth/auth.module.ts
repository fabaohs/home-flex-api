import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from 'src/shared/repositories/user.repository';
import { DrizzleModule } from 'src/configurations/drizzle/drizzle.module';

@Module({
  controllers: [AuthController],
  imports: [DrizzleModule],
  providers: [AuthService, UserRepository],
})
export class AuthModule {}
