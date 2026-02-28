import { Body, Controller, Inject, Post, StreamableFile, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { NATS_SERVICE } from 'src/config';
import { CreatePedidosReporteDto } from './dto/create-pedidos-reporte.dto';
import { AuthGuard } from 'src/rrhh/empleados/guards/auth-empleado.guard';
import { RolesGuard } from 'src/rrhh/empleados/guards/roles.guard';
import { Roles } from 'src/rrhh/empleados/decorators/roles.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('pedidos-reportes')
@UseGuards(AuthGuard,RolesGuard)
@Roles('VENTAS','ADMIN')
export class PedidosReportesController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Post('pdf')
  async generarReportePedidos(@Body() filtros: CreatePedidosReporteDto) {
    const resultado: any = await firstValueFrom(
      this.client.send('generate_pedidos_report', filtros)
    );

    const pdfBuffer = Buffer.from(resultado.pdf, 'base64');

    return new StreamableFile(pdfBuffer, {
      type: 'application/pdf',
      disposition: `attachment; filename="${resultado.filename}"`
    });
  }
  
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Post('preview')
  async previewReporte(@Body() filtros: CreatePedidosReporteDto) {
    return this.client.send('get_pedidos_report', filtros);
  }

}
