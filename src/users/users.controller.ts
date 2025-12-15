import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query, Session } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth/auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './users.entity';
import { authGuard } from 'src/guards/auth.guard';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
    constructor(private readonly usersService: UsersService, private readonly authService: AuthService) { }

    @Post('/signup')
    async createUser(@Body() body: CreateUserDto, @Session() session: any) {
        const { email, password } = body;
        const user = await this.authService.signup(email, password);
        session.userId = user.id;
        return user;
    }

    @Post('/signin')
    @HttpCode(200)
    async signinUser(@Body() body: CreateUserDto, @Session() session: any) {
        const { email, password } = body;

        const user = await this.authService.signin(email, password);
        session.userId = user.id;
        return user;
    }

    @Post('/signout')
    @HttpCode(204)
    signoutUser(@Session() session: any) {
        session.userId = null;
        return
    }

    @Get('/whoami')
    whoAmI(@CurrentUser() user: User) {
        return user
    }

    @Get('/:id')
    @authGuard()
    findUser(@Param('id') id: string) {
        return this.usersService.findOne(+id);
    }

    @Get()
    findAllUsers(@Query('email') email: string) {
        return this.usersService.find(email);
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.usersService.updateUser(+id, body);
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string) {
        return this.usersService.removeUser(+id);
    }
}
