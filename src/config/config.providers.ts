import { ValidationPipe } from "@nestjs/common";
import { APP_PIPE } from "@nestjs/core";

export const GlobalValidationPipe =
{
    provide: APP_PIPE,
    useValue: new ValidationPipe({
        whitelist: true, // Strip properties that do not have any decorators
        transform: true, // Automatically transform payloads to be objects typed according to their DTO classes
        // forbidNonWhitelisted: false, // Throw an error if non-whitelisted properties are present
    }),
}