import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CreateProveedoreDto } from './dto/create-proveedore.dto';
import { UpdateProveedoreDto } from './dto/update-proveedore.dto';
import { ALMACEN_SERVICE, NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';
import { catchError } from 'rxjs';
import { AuthGuard } from 'src/rrhh/empleados/guards/auth-empleado.guard';
import { RolesGuard } from 'src/rrhh/empleados/guards/roles.guard';
import { Roles } from 'src/rrhh/empleados/decorators/roles.decorator';
import { FilterProveedoresDto } from './dto/filtro-proveedor.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('proveedores')
@UseGuards(AuthGuard,RolesGuard)
@Roles('ALMACENISTA','ADMIN')
export class ProveedoresController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Post()
  create(@Body() createProveedoreDto: CreateProveedoreDto) {
    return this.client.send('crear_proveedor', createProveedoreDto).pipe(
      catchError(err=>{throw new RpcException(err)})
    );
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get()
  findAll(@Query() filterProveedoresDto: FilterProveedoresDto) {
    return this.client.send('listar_proveedores', filterProveedoresDto).pipe(
      catchError(err=>{throw new RpcException(err)})
    );
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.client.send('obtener_proveedor', { id }).pipe(
      catchError(err=>{throw new RpcException(err)})
    );
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateProveedoreDto: UpdateProveedoreDto
  ) {
   
    return this.client.send('actualizar_proveedor', {
      id, 
      ...updateProveedoreDto
    }).pipe(
      catchError(err=>{throw new RpcException(err)})
    );
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.client.send('eliminar_proveedor', {id}).pipe(
      catchError(err=>{throw new RpcException(err)})
    );
  }
}
