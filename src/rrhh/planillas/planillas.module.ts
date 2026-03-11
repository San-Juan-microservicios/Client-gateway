import { Module } from '@nestjs/common';
import { PlanillasService } from './planillas.service';
import { PlanillasController } from './planillas.controller';
import { NatsModule } from 'src/nats/nats.module';

@Module({
  imports:[NatsModule],
  controllers: [PlanillasController],
  providers: [PlanillasService],
})
export class PlanillasModule {}
