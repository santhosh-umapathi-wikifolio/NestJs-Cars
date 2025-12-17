import { config } from 'dotenv';
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
  type: 'sqlite',
  database: process.env.DB_NAME || 'db.sqlite',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: process.env.NODE_ENV !== 'production', // Only use synchronize: true in development
};



export const AppDataSource = new DataSource(dbConfig)