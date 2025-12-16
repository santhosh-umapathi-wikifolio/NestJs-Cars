import { Expose, Transform } from "class-transformer";
import { User } from "src/users/users.entity";

export class ReportDto {
    @Expose()
    make: string;

    @Expose()
    model: string;

    @Expose()
    year: number;

    @Expose()
    mileage: number;

    @Expose()
    price: number;

    @Expose()
    latitude: number;

    @Expose()
    longitude: number;

    @Expose()
    @Transform(({ obj }: { obj: ReportDto & { user: User } }) => obj.user.id)
    userId: number;
}