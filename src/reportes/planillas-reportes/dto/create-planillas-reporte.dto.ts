import { IsOptional, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePlanillaReporteDto {

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  idPlanilla?: number; // Si viene → reporte de una planilla específica

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
  estado?: string; // BORRADOR | CERRADA
}