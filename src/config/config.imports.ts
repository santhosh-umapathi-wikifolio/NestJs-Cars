import { ConfigModule } from "@nestjs/config";

// Global Configuration Module  
export const EnvConfigModule = ConfigModule.forRoot({
    isGlobal: true, // Make ConfigModule global
    envFilePath: `.env.${process.env.NODE_ENV || 'development'}`, // Load environment variables based on NODE_ENV
})