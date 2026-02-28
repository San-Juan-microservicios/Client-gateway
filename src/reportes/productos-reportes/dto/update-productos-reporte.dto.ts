import { PartialType } from '@nestjs/mapped-types';
import { CreateProductosReporteDto } from './create-productos-reporte.dto';

export class UpdateProductosReporteDto extends PartialType(CreateProductosReporteDto) {}
