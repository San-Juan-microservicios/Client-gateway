import { Controller, Get, Post, Body, Patch, Param, Delete, StreamableFile, Inject } from '@nestjs/common';
import { AsistenciaReportesService } from './asistencia-reportes.service';
import { CreateAsistenciaReporteDto } from './dto/create-asistencia-reporte.dto';
import { UpdateAsistenciaReporteDto } from './dto/update-asistencia-reporte.dto';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { ClientProxy } from '@nestjs/microservices/client/client-proxy';
import { NATS_SERVICE } from 'src/config';

@Controller('asistencia-reportes')
export class AsistenciaReportesController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post('pdf')
  async generarReporteAsistencia(@Body() filtros: CreateAsistenciaReporteDto) {
    const resultado: any = await firstValueFrom(
      this.client.send('generate_asistencia_report', filtros)
    );

    const pdfBuffer = Buffer.from(resultado.pdf, 'base64');

    return new StreamableFile(pdfBuffer, {
      type: 'application/pdf',
      disposition: `attachment; filename="${resultado.filename}"`
    });
  }
}
