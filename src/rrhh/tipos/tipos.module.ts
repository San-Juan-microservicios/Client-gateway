import { Module } from '@nestjs/common';
import { TiposController } from './tipos.controller';
import { NatsModule } from 'src/nats/nats.module';

@Module({
  controllers: [TiposController],
  providers: [],
  imports:[
    NatsModule
  ]
})
export class TiposModule {}
