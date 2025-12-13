import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post('/signup')
    createUser(@Body() body: CreateUserDto) {
        const { email, password } = body;
        return this.usersService.createUser(email, password);
    }

    @Get('/:id')
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
