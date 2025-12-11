import { TypeOrmModule as NestTypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";

// SQLite Database configuration for TypeORM
const sqliteConfig: TypeOrmModuleOptions = {
    type: 'sqlite',
    database: 'database.sqlite',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true, // Only use synchronize: true in development
};

export const TypeOrmModule = NestTypeOrmModule.forRoot(sqliteConfig)
