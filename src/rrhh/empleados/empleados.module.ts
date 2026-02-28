import { Module } from '@nestjs/common';
import { EmpleadosController } from './empleados.controller';
import { NatsModule } from 'src/nats/nats.module';

@Module({
  controllers: [EmpleadosController],
  providers: [],
  imports:[
    NatsModule
  ]
})
export class EmpleadosModule {}
