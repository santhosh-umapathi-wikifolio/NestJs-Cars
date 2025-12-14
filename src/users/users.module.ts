import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserEntity } from './users.entity';
import { AuthService } from './auth/auth.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, AuthService],
  imports: [UserEntity],
})
export class UsersModule { }
