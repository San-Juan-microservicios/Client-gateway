import { Type } from "class-transformer";
import { IsString, IsNotEmpty, IsPositive, IsNumber, IsOptional, IsEmail } from "class-validator";

export class CreateProveedoreDto {

    @IsString()
    @IsNotEmpty()
    public nombre: string;
//-------------------------
    @IsPositive()
    @Type(() => Number)
    @IsNumber()
    @IsNotEmpty()
    public telefono: number;
//-------------------------
    @IsString()
    @IsOptional()
    @IsEmail()
    public email?: string;
//-------------------------
    @IsString()
    @IsNotEmpty()
    public direccion: string;

    @IsOptional()
    public disponible?: boolean;
}
