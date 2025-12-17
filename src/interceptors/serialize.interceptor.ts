import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { ClassConstructor, plainToInstance } from "class-transformer";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "../users/users.entity";


type TDto = ClassConstructor<unknown>
type TData = User

//Custom Decorator
export function Serialize(dto: TDto) {
    //Uses Nest Decorator to bind the interceptor
    return UseInterceptors(new SerializeInterceptor(dto))
}

//Request/Response Interceptor/Middleware
export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: TDto) { }

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        // Request Interceptor -> Goes here

        return next.handle().pipe(map((data: TData) => {
            // Response Interceptor -> Goes here
            return plainToInstance(this.dto, data, { excludeExtraneousValues: true });
        }));
    }
}