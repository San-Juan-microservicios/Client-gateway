import { Module } from '@nestjs/common';
import { PedidosController } from './pedidos.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, VENTAS_SERVICE } from 'src/config';
import { NatsModule } from 'src/nats/nats.module';

@Module({
  controllers: [PedidosController],
  providers: [],
  imports: [
      NatsModule
  ]
})
export class PedidosModule {}
