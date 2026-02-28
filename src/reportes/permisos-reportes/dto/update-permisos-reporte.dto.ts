import { PartialType } from '@nestjs/mapped-types';
import { CreatePermisosReporteDto } from './create-permisos-reporte.dto';

export class UpdatePermisosReporteDto extends PartialType(CreatePermisosReporteDto) {}
