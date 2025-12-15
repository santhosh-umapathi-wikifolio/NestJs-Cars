import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { UsersService } from "../users.service";


@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
    constructor(private readonly usersService: UsersService) { }

    async intercept(context: ExecutionContext, next: CallHandler<any>) {
        const request = context.switchToHttp().getRequest();

        // Get the userId from session
        const { userId } = request.session || {};

        if (userId) {
            const user = await this.usersService.findOne(userId);
            // Attach the user to the request object to retrieve it later via decorator
            request.currentUser = user;
        }

        return next.handle();
    }
}