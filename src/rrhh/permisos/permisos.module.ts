import { Module } from '@nestjs/common';
import { PermisosController } from './permisos.controller';
import { NatsModule } from 'src/nats/nats.module';

@Module({
  controllers: [PermisosController],
  providers: [],
  imports: [
    NatsModule
  ]
})
export class PermisosModule {}
