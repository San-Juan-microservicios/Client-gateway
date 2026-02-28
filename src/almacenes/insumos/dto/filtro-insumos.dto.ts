import { IsOptional, IsString, IsNumber, IsEnum, Min } from 'class-validator';
import { Type } from 'class-transformer';

export enum NivelStockInsumo {
  BAJO = 'bajo',      // stock < 5
  MEDIO = 'medio',    // stock >= 5 y < 10
  ALTO = 'alto',      // stock >= 10
}

export class FilterInsumosDto {
  // Paginación
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number = 10;

  // Filtro por nombre
  @IsOptional()
  @IsString()
  nombre?: string;

  // Filtro por nivel de stock
  @IsOptional()
  @IsEnum(NivelStockInsumo)
  nivelStock?: NivelStockInsumo;
}