import { IsOptional, IsString, IsNumber, IsEmail, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterProveedoresDto {
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

  // Filtro por teléfono
  @IsOptional()
  @IsString()
  telefono?: string;

  // Filtro por email
  @IsOptional()
  @IsEmail()
  email?: string;

  // Filtro por dirección
  @IsOptional()
  @IsString()
  direccion?: string;
}