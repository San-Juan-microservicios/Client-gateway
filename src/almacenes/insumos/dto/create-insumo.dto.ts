import { Type } from "class-transformer";
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsPositive } from "class-validator";

export class CreateInsumoDto {

    @IsString()
    @IsNotEmpty()
    public nombre: string;

    @IsString()
    @IsOptional()
    public descripcion?: string;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    @Type(() => Number)
    public precio: number;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    @Type(() => Number)
    public stock: number;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    @Type(() => Number)
    public idProveedor: number;

}
