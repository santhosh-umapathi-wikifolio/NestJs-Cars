import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

// Promisify scrypt for easier async/await usage
const scrypt = promisify(_scrypt);


@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) { }

    async signup(email: string, password: string) {
        const user = await this.usersService.find(email);
        if (user.length) {
            throw new BadRequestException('Email already in use');
        }

        // Generating Salt
        const salt = randomBytes(8).toString('hex');
        // Hashing the password + salt
        const hash = (await scrypt(password, salt, 32)) as Buffer;
        // Storing salt and hash together
        const result = salt + '.' + hash.toString('hex');

        return this.usersService.createUser(email, result);
    }

    signin(email: string, password: string) {
        // Signin logic to be implemented
    }

}
