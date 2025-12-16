import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from './config/db.module';
import { EnvConfigModule } from './config/config.imports';
import { GlobalValidationPipe } from './config/config.providers';
const CookieSession = require('cookie-session');

@Module({
  imports: [UsersModule, ReportsModule, TypeOrmModule, EnvConfigModule],
  controllers: [AppController],
  providers: [AppService, GlobalValidationPipe],
})
export class AppModule {
  // Configure middleware for the entire application
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CookieSession({
      keys: ['nestjs-cars-secret-key'],
    })).forRoutes('*');
  }
}
