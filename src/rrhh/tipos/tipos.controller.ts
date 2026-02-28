import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Query, UseGuards } from '@nestjs/common';

import { CreateTipoDto } from './dto/create-tipo.dto';
import { UpdateTipoDto } from './dto/update-tipo.dto';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common';
import { AuthGuard } from '../empleados/guards/auth-empleado.guard';
import { RolesGuard } from '../empleados/guards/roles.guard';
import { Roles } from '../empleados/decorators/roles.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('tipos')
@UseGuards(AuthGuard,RolesGuard)
@Roles('RRHH','ADMIN')
export class TiposController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Post()
  create(@Body() createTipoDto: CreateTipoDto) {

    try {
      return this.client.send('createTipo', createTipoDto).pipe(
        catchError(err => { throw new RpcException(err) })
      );
    } catch (error) {
      throw new RpcException(error)
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    try {
      return this.client.send('findAllTipos', paginationDto).pipe(
        catchError(err=> { throw new RpcException(err) })
      )
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.client.send('findOneTipo',{id: +id}).pipe(
        catchError(err => { throw new RpcException(err) })
      )
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipoDto: UpdateTipoDto) {
    try {
      return this.client.send('updateTipo',{id: +id, ...updateTipoDto}).pipe(
        catchError(err => { throw new RpcException(err) })
      )
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.client.send('removeTipo',{id: +id}).pipe(
        catchError(err=> { throw new RpcException(err) })
      )
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
