import { IsString, IsNotEmpty, IsNumber, IsPositive, IsBoolean, IsOptional } from "class-validator";

export class CreateClienteDto {

    @IsString()
    @IsNotEmpty()
    public nombre: string;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    public telefono: number;

    @IsString()
    @IsNotEmpty()
    public direccion: string;

    @IsBoolean()
    @IsOptional()
    public activo: boolean;
}
