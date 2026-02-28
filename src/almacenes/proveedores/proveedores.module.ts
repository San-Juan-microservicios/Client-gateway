import { Module } from '@nestjs/common';
import { ProveedoresController } from './proveedores.controller';
import { NatsModule } from 'src/nats/nats.module';

@Module({
  controllers: [ProveedoresController],
  providers: [],
  imports:[
    NatsModule
  ]
})
export class ProveedoresModule {}
