import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';
import { ALMACEN_SERVICE, NATS_SERVICE } from 'src/config';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { catchError, firstValueFrom } from 'rxjs';
import { AuthGuard } from 'src/rrhh/empleados/guards/auth-empleado.guard';
import { Roles } from 'src/rrhh/empleados/decorators/roles.decorator';
import { RolesGuard } from 'src/rrhh/empleados/guards/roles.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { FilterProductosDto } from './dto/filtro-producto.dto';

@Controller('productos')
@UseGuards(AuthGuard,RolesGuard)
@Roles('ALMACENISTA','ADMIN')
export class ProductosController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) {

  }

  
  // @UseGuards(AuthGuard,RolesGuard)
  // @Roles('ALMACENISTA','ADMIN')
  @Post()
  @ApiBearerAuth()
  create(@Body() createProductoDto: CreateProductoDto) {
    return this.client.send({cmd:'crear_producto'}, createProductoDto).pipe(
      catchError(err => {throw new RpcException(err)})
    )
  }

  
  // @UseGuards(AuthGuard,RolesGuard)
  // @Roles('ALMACENISTA','ADMIN')
  @Get()
  @ApiBearerAuth()
  async findAll(@Query() filterProductosDto:FilterProductosDto) {
    return this.client.send({cmd:'listar_productos'}, filterProductosDto).pipe(
      catchError(err => {throw new RpcException(err)})
    );
  }

  // @UseGuards(AuthGuard,RolesGuard)
  // @Roles('ALMACENISTA','ADMIN')
  @Get(':id')
  @ApiBearerAuth()
  async findOne(@Param('id') id: string) {
    return this.client.send({cmd:'ver_producto'},{id}).pipe(
      catchError(err => {throw new RpcException(err)})
    );
  }

  // @UseGuards(AuthGuard,RolesGuard)
  // @Roles('ALMACENISTA','ADMIN')
  @Patch(':id')
  @ApiBearerAuth()
  update(
    @Param('id', ParseIntPipe) id:number, 
    @Body() updateProductoDto: UpdateProductoDto
  ) {
    return this.client.send({cmd:'actualizar_producto'},{
      id, 
      ...updateProductoDto
    }).pipe(
      catchError(err => {throw new RpcException(err)})
    );
  }

  // @UseGuards(AuthGuard,RolesGuard)
  // @Roles('ALMACENISTA','ADMIN')
  @Delete(':id')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.client.send({cmd:'eliminar_producto'}, {id}).pipe(
      catchError(err => {throw new RpcException(err)})
    );
  }


}
