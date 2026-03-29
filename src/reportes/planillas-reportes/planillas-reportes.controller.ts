import { Controller, Post, Body, Inject, StreamableFile, UseGuards } from '@nestjs/common';
import { CreatePlanillaReporteDto } from './dto/create-planillas-reporte.dto';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AuthGuard } from 'src/rrhh/empleados/guards/auth-empleado.guard';
import { RolesGuard } from 'src/rrhh/empleados/guards/roles.guard';
import { Roles } from 'src/rrhh/empleados/decorators/roles.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('planilla-reportes')
// @UseGuards(AuthGuard, RolesGuard)
// @Roles('RRHH', 'ADMIN')
export class PlanillaReportesController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) {}

  // @UseGuards(AuthGuard)
  // @ApiBearerAuth()
  @Post('pdf')
  async generarReportePlanilla(@Body() filtros: CreatePlanillaReporteDto) {
    const resultado: any = await firstValueFrom(
      this.client.send('generate_planilla_report', filtros)
    );

    const pdfBuffer = Buffer.from(resultado.pdf, 'base64');

    return new StreamableFile(pdfBuffer, {
      type: 'application/pdf',
      disposition: `attachment; filename="${resultado.filename}"`
    });
  }
}
