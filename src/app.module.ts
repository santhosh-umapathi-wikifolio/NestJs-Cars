import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from './config/db.module';
import { EnvConfigModule } from './config/config.imports';
import { GlobalValidationPipe } from './config/config.providers';
import { CookieSessionMiddleware } from './middlewares/cookie-session.middleware';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [UsersModule, ReportsModule, TypeOrmModule, EnvConfigModule],
  controllers: [AppController],
  providers: [AppService, GlobalValidationPipe],
})

export class AppModule {
  constructor(private configService: ConfigService) { }

  // Configure middleware for the entire application
  configure(consumer: MiddlewareConsumer) {
    const COOKIE_KEY = this.configService.get<string>('COOKIE_KEY') || 'default-secret-key';
    consumer.apply(CookieSessionMiddleware(COOKIE_KEY)).forRoutes('*');
  }
}
