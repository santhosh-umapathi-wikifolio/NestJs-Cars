import { CanActivate, ExecutionContext, UseGuards } from "@nestjs/common";

// Guard to check if the user is authenticated based on session data
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();

        const { userId } = request.session || {};
        return Boolean(userId);
    }
}

// Decorator to apply the AuthGuard to route handlers
export function authGuard() {
    return UseGuards(AuthGuard);
}