import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Query, UseGuards } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE, VENTAS_SERVICE } from 'src/config';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common';
import { AuthGuard } from 'src/rrhh/empleados/guards/auth-empleado.guard';
import { RolesGuard } from 'src/rrhh/empleados/guards/roles.guard';
import { Roles } from 'src/rrhh/empleados/decorators/roles.decorator';
import { FilterClientesDto } from './dto/filtro-cliente.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@UseGuards(AuthGuard,RolesGuard)
@Roles('VENTAS','ADMIN')
@Controller('clientes')
export class ClientesController {
  constructor(
     @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Post()
  create(@Body() createClienteDto: CreateClienteDto) {
    return this.client.send('createCliente', createClienteDto).pipe(
      catchError(err => {throw new RpcException(err)})
    );
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get()
  findAll(@Query() filterClientesDto: FilterClientesDto) {
    return this.client.send('findAllClientes', filterClientesDto).pipe(
      catchError(err => {throw new RpcException(err)})
    );
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.client.send('findOneCliente', { id: +id }).pipe(
      catchError(err => {throw new RpcException(err)})
    );
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClienteDto: UpdateClienteDto) {
    return this.client.send('updateCliente', { id: +id, ...updateClienteDto }).pipe(
      catchError(err => {throw new RpcException(err)})
    );
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.client.send('removeCliente', { id: +id }).pipe(
      catchError(err => {throw new RpcException(err)})
    );
  }
}
