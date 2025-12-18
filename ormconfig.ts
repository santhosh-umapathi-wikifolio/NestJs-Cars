import { config } from 'dotenv';
import { url } from 'inspector';
import { DataSource, DataSourceOptions } from 'typeorm';

// Load environment-specific .env file
let envFile: string;
switch (process.env.NODE_ENV) {
  case 'production':
    envFile = '.env.production';
    break;
  case 'test':
    envFile = '.env.test';
    break;
  case 'development':
  default:
    envFile = '.env.development';
    break;
}

// Load the environment variables from the specified .env file
config({ path: envFile });

const dbConfig: DataSourceOptions = {
  type: (process.env.DB_TYPE as 'sqlite' | 'postgres'),
  url: process.env.DATABASE_URL,
  database: process.env.DB_NAME || 'db.sqlite',
  // ssl: {
  //   rejectUnauthorized: false
  // },
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false, // Only use synchronize: true in testing/development

  //Migration settings
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
  migrationsRun: process.env.NODE_ENV !== 'development', // Automatically run migrations in production and test
  migrationsTransactionMode: 'all',
  logging: process.env.NODE_ENV !== 'production',
};



export const AppDataSource = new DataSource(dbConfig)