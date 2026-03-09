import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Query } from '@nestjs/common';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { UpdateAsistenciaDto } from './dto/update-asistencia.dto';
import { FiltroAsistenciaDto } from './dto/filtro-asistenciaDto';
import { PaginationDto } from 'src/common';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../empleados/guards/auth-empleado.guard';
import { RolesGuard } from '../empleados/guards/roles.guard';
import { Roles } from '../empleados/decorators/roles.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('asistencia')
export class AsistenciaController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
  ) {}

  // POST /rrhh/asistencia
  // @UseGuards(AuthGuard, RolesGuard)
  // @Roles('RRHH', 'ADMIN')
  // @ApiBearerAuth()
  @Post()
  create(@Body() createAsistenciaDto: CreateAsistenciaDto) {
    return this.client.send('createAsistencia', createAsistenciaDto).pipe(
      catchError(err => { throw new RpcException(err); }),
    );
  }

  // GET /rrhh/asistencia
  // @UseGuards(AuthGuard, RolesGuard)
  // @Roles('RRHH', 'ADMIN')
  // @ApiBearerAuth()
  @Get()
  findAll(@Query() filtroAsistenciaDto: FiltroAsistenciaDto) {
    return this.client.send('findAllAsistencia', filtroAsistenciaDto).pipe(
      catchError(err => { throw new RpcException(err); }),
    );
  }

  // GET /rrhh/asistencia/:id
  // @UseGuards(AuthGuard, RolesGuard)
  // @Roles('RRHH', 'ADMIN')
  // @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.client.send('findOneAsistencia', { id: +id }).pipe(
      catchError(err => { throw new RpcException(err); }),
    );
  }

  // PATCH /rrhh/asistencia/:id
  // @UseGuards(AuthGuard, RolesGuard)
  // @Roles('RRHH', 'ADMIN')
  // @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateAsistenciaDto: UpdateAsistenciaDto) {
    return this.client.send('updateAsistencia', { id: +id, ...updateAsistenciaDto }).pipe(
      catchError(err => { throw new RpcException(err); }),
    );
  }

}