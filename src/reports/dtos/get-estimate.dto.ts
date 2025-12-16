import { Transform } from "class-transformer";
import { IsLatitude, IsLongitude, IsNumber, IsString, Max, Min } from "class-validator";

export class GetEstimateDto {
    @IsString()
    @Transform(({ value }) => value.trim())
    make: string;

    @IsString()
    @Transform(({ value }) => value.trim())
    model: string;

    @IsNumber()
    @Min(1930)
    @Max(new Date().getFullYear())
    @Transform(({ value }) => +(value))
    year: number;

    @IsNumber()
    @Transform(({ value }) => +(value))
    mileage: number;

    @IsLatitude()
    @Transform(({ value }) => +(value))
    latitude: number;

    @IsLongitude()
    @Transform(({ value }) => +(value))
    longitude: number;
}