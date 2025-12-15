import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from './config/db.module';
import { APP_PIPE } from '@nestjs/core';
const CookieSession = require('cookie-session');

@Module({
  imports: [UsersModule, ReportsModule, TypeOrmModule],
  controllers: [AppController],
  providers: [AppService,
    // Global Validation Pipe
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true, // Strip properties that do not have any decorators
        transform: true, // Automatically transform payloads to be objects typed according to their DTO classes
        // forbidNonWhitelisted: false, // Throw an error if non-whitelisted properties are present
      }),
    }
  ],
})
export class AppModule {
  // Configure middleware for the entire application
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CookieSession({
      keys: ['nestjs-cars-secret-key'],
    })).forRoutes('*');
  }
}
