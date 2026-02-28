import { IsOptional, IsString, IsNumber, IsEnum } from 'class-validator';

export enum EstadoPedido {
  PENDIENTE = 'PENDIENTE',
  CONFIRMADO = 'CONFIRMADO',
  EN_PROCESO = 'EN_PROCESO',
  ENVIADO = 'ENVIADO',
  ENTREGADO = 'ENTREGADO',
  CANCELADO = 'CANCELADO'
}

export class CreatePedidosReporteDto {
  @IsOptional()
  @IsEnum(EstadoPedido)
  estado?: EstadoPedido;

  @IsOptional()
  @IsString()
  fechaDesde?: string;

  @IsOptional()
  @IsString()
  fechaHasta?: string;

  @IsOptional()
  @IsNumber()
  idCliente?: number;
}
