import { PartialType } from '@nestjs/mapped-types';
import { CreatePedidosReporteDto } from './create-pedidos-reporte.dto';

export class UpdatePedidosReporteDto extends PartialType(CreatePedidosReporteDto) {}
