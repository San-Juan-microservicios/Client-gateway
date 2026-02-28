import { Module } from '@nestjs/common';
import { InsumosController } from './insumos.controller';
import { NatsModule } from 'src/nats/nats.module';

@Module({
  controllers: [InsumosController],
  providers: [],
  imports: [
    NatsModule
  ]
})
export class InsumosModule {}
