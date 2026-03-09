import { IsEnum, IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class UpdateAsistenciaDto {

  @IsString()
  @IsOptional()
  observacion?: string;
}