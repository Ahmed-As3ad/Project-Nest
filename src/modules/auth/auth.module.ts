import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModel } from '../../DB/model';
import { UserRepository } from '../../DB/Repository/user.repository.js';

@Module({
  imports: [UserModel],
  exports: [AuthService],
  controllers: [AuthController],
  providers: [AuthService, UserRepository],
})
export class AuthenticationModule {}
