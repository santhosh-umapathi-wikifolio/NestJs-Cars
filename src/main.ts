import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.use(
  //   CookieSession({
  //     keys: ['nestjs-cars-secret-key'],
  //   }),
  // )

  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true, // Strip properties that do not have any decorators
  //     transform: true, // Automatically transform payloads to be objects typed according to their DTO classes
  //     // forbidNonWhitelisted: false, // Throw an error if non-whitelisted properties are present
  //   }),
  // );

  await app.listen(PORT);
}


bootstrap().then(() => {
  console.log(`Application is running on: http://localhost:${PORT}`);
}).catch((err) => {
  console.error('Error during application bootstrap:', err);
});
