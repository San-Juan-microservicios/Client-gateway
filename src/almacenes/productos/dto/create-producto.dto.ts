import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateProductoDto {


    @IsString()
    @IsNotEmpty()
    public nombre: string;
//-------------------------
    @IsNumber({
        maxDecimalPlaces: 4
    })
    @IsPositive()
    @Type( () => Number)
    @IsNotEmpty()
    public precioUnidad: number;
//-------------------------
    @IsOptional()
    @IsString()
    public descripcion: string;
//-------------------------
    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    @IsNotEmpty()
    public stock: number;
}
