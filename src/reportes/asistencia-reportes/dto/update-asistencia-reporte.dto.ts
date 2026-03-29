import { PartialType } from '@nestjs/swagger';
import { CreateAsistenciaReporteDto } from './create-asistencia-reporte.dto';

export class UpdateAsistenciaReporteDto extends PartialType(CreateAsistenciaReporteDto) {}
