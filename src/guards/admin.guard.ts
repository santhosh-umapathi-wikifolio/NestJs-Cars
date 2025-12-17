import { CanActivate, ExecutionContext, UseGuards } from "@nestjs/common";
import { User } from "../users/users.entity";

// Guard to check if the user is authorized based on role
export class AdminGuard implements CanActivate {
    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();

        const currentUser = request.currentUser as User

        if (!currentUser) {
            return false;
        }

        return currentUser.admin
    }
}

// Decorator to apply the AdminGuard to route handlers
export function adminGuard() {
    return UseGuards(AdminGuard);
}