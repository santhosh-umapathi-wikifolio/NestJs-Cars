import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post('/signup')
    createUser(@Body() body: CreateUserDto) {
        const { email, password } = body;
        console.log("🔥 --- UsersController --- createUser --- email, password :", body)
        return this.usersService.createUser(email, password);
    }
}
