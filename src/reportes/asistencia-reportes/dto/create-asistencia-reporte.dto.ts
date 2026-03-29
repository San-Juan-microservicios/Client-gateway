import { IsOptional, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAsistenciaReporteDto {

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  idEmpleado?: number;

  @IsOptional()
  @IsString()
  fechaDesde?: string;

  @IsOptional()
  @IsString()
  fechaHasta?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  mes?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  anio?: number;

  @IsOptional()
  @IsString()
  estado?: string;
}