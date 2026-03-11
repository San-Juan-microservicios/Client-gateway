import { IsInt, IsPositive, IsOptional, Min, Max, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class FiltroPlanillaDto {
  @IsInt() @IsPositive() @IsOptional() @Type(() => Number)
  page?: number;

  @IsInt() @IsPositive() @IsOptional() @Type(() => Number)
  limit?: number;
@IsString() @IsOptional()
nombreEmpleado?: string;
  @IsOptional()
  estado?: string;

  @IsInt() @Min(1) @Max(12) @IsOptional() @Type(() => Number)
  mes?: number;

  @IsInt() @Min(2020) @IsOptional() @Type(() => Number)
  anio?: number;
}