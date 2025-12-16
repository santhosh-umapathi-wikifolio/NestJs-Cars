import { IsLatitude, IsLongitude, IsNumber, IsString, Max, Min } from "class-validator";

export class CreateReportDto {
    @IsString()
    make: string;

    @IsString()
    model: string;

    @IsNumber()
    @Min(1930)
    @Max(new Date().getFullYear())
    year: number;

    @IsNumber()
    mileage: number;

    @IsNumber()
    price: number;

    @IsLatitude()
    latitude: number;

    @IsLongitude()
    longitude: number;
}