import { TypeOrmModule as NestTypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";

// SQLite Database configuration for TypeORM
const sqliteConfig: TypeOrmModuleOptions = {
    type: 'sqlite',
    database: 'database.sqlite',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
};

export const TypeOrmModule = NestTypeOrmModule.forRoot(sqliteConfig)
