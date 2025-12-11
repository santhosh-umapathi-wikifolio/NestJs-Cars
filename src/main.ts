import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
}


bootstrap().then(() => {
  console.log(`Application is running on: http://localhost:${PORT}`);
}).catch((err) => {
  console.error('Error during application bootstrap:', err);
});
