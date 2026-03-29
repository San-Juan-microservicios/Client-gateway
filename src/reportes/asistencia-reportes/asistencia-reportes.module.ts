import { Module } from '@nestjs/common';
import { AsistenciaReportesService } from './asistencia-reportes.service';
import { AsistenciaReportesController } from './asistencia-reportes.controller';
import { NatsModule } from 'src/nats/nats.module';

@Module({
  imports: [NatsModule],
  controllers: [AsistenciaReportesController],
  providers: [AsistenciaReportesService],
})
export class AsistenciaReportesModule {}
