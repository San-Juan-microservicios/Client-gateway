import { Module } from '@nestjs/common';
import { InsumosReportesController } from './insumos-reportes.controller';
import { NatsModule } from 'src/nats/nats.module';

@Module({
  controllers: [InsumosReportesController],
  providers: [],
  imports:[
    NatsModule
  ]
})
export class InsumosReportesModule {}
