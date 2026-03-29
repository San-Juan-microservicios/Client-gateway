import { PartialType } from '@nestjs/swagger';
import { CreatePlanillaReporteDto } from './create-planillas-reporte.dto';

export class UpdatePlanillasReporteDto extends PartialType(CreatePlanillaReporteDto) {}
