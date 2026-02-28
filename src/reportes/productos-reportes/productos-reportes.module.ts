import { Module } from '@nestjs/common';
import { ProductosReportesController } from './productos-reportes.controller';
import { NatsModule } from 'src/nats/nats.module';

@Module({
  controllers: [ProductosReportesController],
  providers: [],
  imports:[
    NatsModule
  ]
})
export class ProductosReportesModule {}
