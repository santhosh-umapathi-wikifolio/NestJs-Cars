import { ConfigService } from "@nestjs/config";
import { TypeOrmModule as NestTypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";

// SQLite Database configuration for TypeORM
const sqliteConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
    type: 'sqlite',
    database: configService.get<string>('DB_NAME', 'database.sqlite'),
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true, // Only use synchronize: true in development
});

export const TypeOrmModule = NestTypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
        // You can extend this factory to switch between different databases
        // based on environment variables or other configuration settings.
        return sqliteConfig(configService)
    }
})
