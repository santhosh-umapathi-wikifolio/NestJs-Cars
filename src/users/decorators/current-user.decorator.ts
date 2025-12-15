import { createParamDecorator, ExecutionContext } from "@nestjs/common";

// Custom Param Decorator
export const CurrentUser = createParamDecorator(
    (data: unknown, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        // Current user is attached via interceptor
        return request.currentUser;
    }
)