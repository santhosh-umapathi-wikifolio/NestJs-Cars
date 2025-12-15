import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserEntity } from './users.entity';
import { AuthService } from './auth/auth.service';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  controllers: [UsersController],
  providers: [UsersService, AuthService,
    // Global interceptor
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor,
    }
  ],
  imports: [UserEntity],
})
export class UsersModule { }
