import { Module } from '@nestjs/common';
import { PedidosReportesController } from './pedidos-reportes.controller';
import { NatsModule } from 'src/nats/nats.module';

@Module({
  controllers: [PedidosReportesController],
  providers: [],
  imports:[
    NatsModule
  ]
})
export class PedidosReportesModule {}
