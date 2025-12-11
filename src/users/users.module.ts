import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserEntity } from './users.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [UserEntity],
})
export class UsersModule { }
