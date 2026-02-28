import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Query, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { CreateInsumoDto } from './dto/create-insumo.dto';
import { UpdateInsumoDto } from './dto/update-insumo.dto';
import { ALMACEN_SERVICE, NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';
import { catchError, firstValueFrom } from 'rxjs';
import { AuthGuard } from 'src/rrhh/empleados/guards/auth-empleado.guard';
import { RolesGuard } from 'src/rrhh/empleados/guards/roles.guard';
import { Roles } from 'src/rrhh/empleados/decorators/roles.decorator';
import { FilterInsumosDto } from './dto/filtro-insumos.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('insumos')
@UseGuards(AuthGuard,RolesGuard)
@Roles('ALMACENISTA','ADMIN')
export class InsumosController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiBearerAuth()
  create(@Body() createInsumoDto: CreateInsumoDto) {

    try {
      return this.client.send('crear_insumo', createInsumoDto).pipe(
        catchError(err=>{throw new RpcException(err)})
      );
      
    } catch (error) {
      throw new RpcException(error)
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get()
  findAll(@Query() filterInsumosDto:FilterInsumosDto) {
    try {
      return this.client.send('listar_insumos', filterInsumosDto).pipe(
        catchError(err=>{throw new RpcException(err)})
      );
    } catch (error) {
      throw new RpcException(error);
    }
    
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const insumo = await firstValueFrom(
        this.client.send('obtener_insumo', { id })
      )
      return insumo;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, 
  @Body() updateInsumoDto: UpdateInsumoDto
) {
    try {
      const insumo = await firstValueFrom(
          this.client.send('actualizar_insumo', {
          id, 
          ...updateInsumoDto 
        })
      );
      return insumo;
    } catch (error) {
      throw new RpcException(error);
    }
    
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const insumo = await firstValueFrom(
        this.client.send('eliminar_insumo', { id })
      );
      return insumo;
    } catch (error) {
      throw new RpcException(error);
    }
    
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Put(':id')
  async sacarInsumo(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateInsumoDto: UpdateInsumoDto
  ){
    try {
      const { cantidad } = updateInsumoDto;
      const insumo = await firstValueFrom(
        this.client.send('sacar_insumo', { 
          id, 
          cantidad
        })
      );
    return insumo;
    } catch (error) {
      throw new RpcException(error);
    }
    
  }

}
