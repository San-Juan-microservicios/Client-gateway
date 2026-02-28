import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Res, StreamableFile, UseGuards } from '@nestjs/common';
import { CreateProductosReporteDto } from './dto/create-productos-reporte.dto';
import { UpdateProductosReporteDto } from './dto/update-productos-reporte.dto';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AuthGuard } from 'src/rrhh/empleados/guards/auth-empleado.guard';
import { RolesGuard } from 'src/rrhh/empleados/guards/roles.guard';
import { Roles } from 'src/rrhh/empleados/decorators/roles.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('productos-reportes')
@UseGuards(AuthGuard,RolesGuard)
@Roles('ALMACENISTA','ADMIN')
export class ProductosReportesController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Post('stock/pdf2')
  async generarReporteStock2(
    @Body() filtros: CreateProductosReporteDto,
  ) {
    const resultado: any = await firstValueFrom(
      this.client.send({ cmd: 'generate_stock_report' }, filtros)
    );

    const pdfBuffer = Buffer.from(resultado.pdf, 'base64');

    return new StreamableFile(pdfBuffer, {
      type: 'application/pdf',
      disposition: `attachment; filename="${resultado.filename}"`,
    });
  }


  // @Post('stock/preview')
  // async previewReporte(@Body() filtros: CreateProductosReporteDto) {
  //   return this.client.send({ cmd: 'generate_stock_report' }, filtros);
  // }

  // @Get()
  // findAll() {
  //   return this.productosReportesService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.productosReportesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProductosReporteDto: UpdateProductosReporteDto) {
  //   return this.productosReportesService.update(+id, updateProductosReporteDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.productosReportesService.remove(+id);
  // }
}
