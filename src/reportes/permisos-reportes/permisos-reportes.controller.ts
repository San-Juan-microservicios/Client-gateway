import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, StreamableFile, UseGuards } from '@nestjs/common';
import { CreatePermisosReporteDto } from './dto/create-permisos-reporte.dto';
import { UpdatePermisosReporteDto } from './dto/update-permisos-reporte.dto';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AuthGuard } from 'src/rrhh/empleados/guards/auth-empleado.guard';
import { RolesGuard } from 'src/rrhh/empleados/guards/roles.guard';
import { Roles } from 'src/rrhh/empleados/decorators/roles.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('permisos-reportes')
@UseGuards(AuthGuard,RolesGuard)
@Roles('RRHH','ADMIN')
export class PermisosReportesController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Post('pdf')
  async generarReportePermisos(@Body() filtros: CreatePermisosReporteDto) {
    const resultado: any = await firstValueFrom(
      this.client.send('generate_permisos_report', filtros)
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
  async previewReporte(@Body() filtros: CreatePermisosReporteDto) {
    return this.client.send('get_permisos_report', filtros);
  }

}
