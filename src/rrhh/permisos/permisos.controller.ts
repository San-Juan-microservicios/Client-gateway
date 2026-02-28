import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Query, UseGuards } from '@nestjs/common';
import { CreatePermisoDto } from './dto/create-permiso.dto';
import { UpdatePermisoDto } from './dto/update-permiso.dto';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';
import { catchError } from 'rxjs';
import { AuthGuard } from '../empleados/guards/auth-empleado.guard';
import { RolesGuard } from '../empleados/guards/roles.guard';
import { Roles } from '../empleados/decorators/roles.decorator';
import { FilterPermisosDto } from './dto/filtro-permiso.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('permisos')
@Controller('empleados')
@UseGuards(AuthGuard,RolesGuard)
@Roles('RRHH','ADMIN')
export class PermisosController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Post()
  create(@Body() createPermisoDto: CreatePermisoDto) {
    return this.client.send('createPermiso', createPermisoDto).pipe(
      catchError(err => {throw new RpcException(err)})
    );
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get()
  findAll(@Query() filterPermisosDto: FilterPermisosDto) {
    return this.client.send('findAllPermisos', filterPermisosDto).pipe(
      catchError(err => {throw new RpcException(err)})
    );
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.client.send('findOnePermiso', {id}).pipe(
      catchError(err => {throw new RpcException(err)})
    );
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: number) {
    return this.client.send('updatePermiso', {id}).pipe(
      catchError(err => {throw new RpcException(err)})
    );
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.client.send('removePermiso', {id}).pipe(
      catchError(err => {throw new RpcException(err)})
    );
  }
}
