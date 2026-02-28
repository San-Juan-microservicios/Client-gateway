import { Module } from '@nestjs/common';
import { PermisosReportesController } from './permisos-reportes.controller';
import { NatsModule } from 'src/nats/nats.module';

@Module({
  controllers: [PermisosReportesController],
  providers: [],
  imports:[
    NatsModule
  ]
})
export class PermisosReportesModule {}
