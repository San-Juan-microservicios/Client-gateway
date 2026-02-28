import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, StreamableFile, UseGuards } from '@nestjs/common';
import { CreateInsumosReporteDto } from './dto/create-insumos-reporte.dto';
import { UpdateInsumosReporteDto } from './dto/update-insumos-reporte.dto';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { RolesGuard } from 'src/rrhh/empleados/guards/roles.guard';
import { Roles } from 'src/rrhh/empleados/decorators/roles.decorator';
import { AuthGuard } from 'src/rrhh/empleados/guards/auth-empleado.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('insumos-reportes')
@UseGuards(AuthGuard,RolesGuard)
@Roles('ALMACENISTA','ADMIN')
export class InsumosReportesController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Post('stock/pdf')
  async generarReporteStock(@Body() filtros: CreateInsumosReporteDto) {
    const resultado: any = await firstValueFrom(
      this.client.send({ cmd: 'generate_insumos_stock_report' }, filtros)
    );

    const pdfBuffer = Buffer.from(resultado.pdf, 'base64');

    return new StreamableFile(pdfBuffer, {
      type: 'application/pdf',
      disposition: `attachment; filename="${resultado.filename}"`
    });
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Post('stock/preview')
  async previewReporte(@Body() filtros: CreateInsumosReporteDto) {
    return this.client.send({ cmd: 'get_insumos_stock_report' }, filtros);
  }

}
