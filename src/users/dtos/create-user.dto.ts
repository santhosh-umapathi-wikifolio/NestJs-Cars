import { IsEmail, isEmail, IsStrongPassword, isStrongPassword } from "class-validator";


export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsStrongPassword()
    password: string;
}