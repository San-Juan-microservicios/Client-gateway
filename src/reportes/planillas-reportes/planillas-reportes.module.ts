import { Module } from '@nestjs/common';

import { PlanillaReportesController } from './planillas-reportes.controller';
import { NatsModule } from 'src/nats/nats.module';

@Module({
  imports: [NatsModule],
  controllers: [PlanillaReportesController],
  providers: [],
})
export class PlanillasReportesModule {}
