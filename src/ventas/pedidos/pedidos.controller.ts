import { Controller, Get, Post, Body, Param, Inject, Query, Put, Patch, UseGuards } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE, VENTAS_SERVICE } from 'src/config';
import { PaginationPedidoDto } from './dto';
import { catchError } from 'rxjs';
import { AuthGuard } from 'src/rrhh/empleados/guards/auth-empleado.guard';
import { RolesGuard } from 'src/rrhh/empleados/guards/roles.guard';
import { Roles } from 'src/rrhh/empleados/decorators/roles.decorator';
import { FilterPedidosDto } from './dto/filtro-pedido.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('pedidos')
@UseGuards(AuthGuard,RolesGuard)
@Roles('VENTAS','ADMIN')
export class PedidosController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Post()
  create(@Body() createPedidoDto: CreatePedidoDto) {
    return this.client.send('createPedido', createPedidoDto).pipe(
      catchError(err => {throw new RpcException(err)})
    );
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get()
  findAll(@Query() filterPedidosDto: FilterPedidosDto) {
    return this.client.send('findAllPedidos', filterPedidosDto).pipe(
      catchError(err => {throw new RpcException(err)})
    );
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.client.send('findOnePedido', { id: +id }).pipe(
      catchError(err => {throw new RpcException(err)})
    );
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Patch('/cambiar-estado/:id')
  cambiarEstado(@Param('id') id: string){
    return this.client.send('CambiarEstadoPedido',{id: +id}).pipe(
      catchError(err => {throw new RpcException(err)})
    );
  }
  
}
