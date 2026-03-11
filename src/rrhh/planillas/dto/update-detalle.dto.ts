import { IsInt, IsPositive, IsOptional, IsString, IsNumber, Min } from 'class-validator';

export class UpdateDetalleDto {

  @IsNumber() @Min(0) @IsOptional()
  descuentos?: number;

  @IsString() @IsOptional()
  observacion?: string;
}