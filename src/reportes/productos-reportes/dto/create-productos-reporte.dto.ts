import { IsOptional, IsNumber } from "class-validator";

export class CreateProductosReporteDto {

    @IsOptional()
    @IsNumber()
    stockMinimo?: number;


    @IsOptional()
    @IsNumber()
    proveedor?: number;

}
