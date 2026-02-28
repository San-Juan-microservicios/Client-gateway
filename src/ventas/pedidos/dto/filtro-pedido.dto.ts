import { IsOptional, IsString, IsNumber, IsEnum, Min } from 'class-validator';
import { Type } from 'class-transformer';

export enum EstadoPedido {
  PENDIENTE = 'PENDIENTE',
  COMPLETADO = 'COMPLETADO',
}

export class FilterPedidosDto {
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

  // Filtro por nombre del cliente
  @IsOptional()
  @IsString()
  nombreCliente?: string;

  // Filtro por estado del pedido
  @IsOptional()
  @IsEnum(EstadoPedido)
  estado?: EstadoPedido;
}