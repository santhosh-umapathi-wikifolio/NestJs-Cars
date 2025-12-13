import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
export class SerializeInterceptor implements NestInterceptor {

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        console.log('Request Interceptor')
        console.log('context', context)
        return next.handle().pipe(map((data: any) => {
            console.log('Response Interceptor')
            console.log('data', data)
        }));
    }
}