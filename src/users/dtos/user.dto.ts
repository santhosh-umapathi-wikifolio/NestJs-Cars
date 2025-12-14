import { Expose } from "class-transformer"

//User for Response DTO
export class UserDto {
    @Expose()
    id: string;
    @Expose()
    email: string;
}