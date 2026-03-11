import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, ParseIntPipe, Query } from '@nestjs/common';
import { PlanillasService } from './planillas.service';
import { CreatePlanillaDto } from './dto/create-planilla.dto';
import { UpdatePlanillaDto } from './dto/update-planilla.dto';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { FiltroPlanillaDto } from './dto/filtro-planilla.dto';
import { UpdateDetalleDto } from './dto/update-detalle.dto';
import { catchError } from 'rxjs';

@Controller('planillas')
export class PlanillasController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

// POST /rrhh/planilla
  @Post()
  create(@Body() dto: CreatePlanillaDto) {
    return this.client.send('createPlanilla', dto).pipe(
      catchError(err => { throw new RpcException(err); }),
    );
  }

  // GET /rrhh/planilla
  @Get()
  findAll(@Query() dto: FiltroPlanillaDto) {
    return this.client.send('findAllPlanillas', dto).pipe(
      catchError(err => { throw new RpcException(err); }),
    );
  }

  @Get('detalle/:id')
  findOneDetalle(@Param('id', ParseIntPipe) id: number) {
    return this.client.send('findOneDetallePlanilla', { id }).pipe(
      catchError(err => { throw new RpcException(err); }),
    );
  }

  // GET /rrhh/planilla/:id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.client.send('findOnePlanilla', { id }).pipe(
      catchError(err => { throw new RpcException(err); }),
    );
  }

  // PATCH /rrhh/planilla/:id/cerrar
  @Patch(':id/cerrar')
  cerrar(@Param('id', ParseIntPipe) id: number) {
    return this.client.send('cerrarPlanilla', { id }).pipe(
      catchError(err => { throw new RpcException(err); }),
    );
  }
}
