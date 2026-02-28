import { PartialType } from '@nestjs/mapped-types';
import { CreateInsumosReporteDto } from './create-insumos-reporte.dto';

export class UpdateInsumosReporteDto extends PartialType(CreateInsumosReporteDto) {}
