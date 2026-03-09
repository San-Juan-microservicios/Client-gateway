import { Module } from '@nestjs/common';
import { AsistenciaService } from './asistencia.service';
import { AsistenciaController } from './asistencia.controller';
import { NatsModule } from 'src/nats/nats.module';

@Module({
  controllers: [AsistenciaController],
  providers: [AsistenciaService],
  imports: [
    NatsModule
  ]
})
export class AsistenciaModule {}
