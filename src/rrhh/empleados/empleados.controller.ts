import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Query, Req, UseGuards } from '@nestjs/common';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common';
import { LoginEmpleadoDto } from './dto/login-empleado.dto';
import { AuthGuard } from './guards/auth-empleado.guard';
import { Empleado } from './decorators/empleado.decorator';
import { Token } from './decorators/token.decorator';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';
import { FilterEmpleadosDto } from './dto/filtro-empleado.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('empleados')
export class EmpleadosController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client : ClientProxy
  ) {}

  @UseGuards(AuthGuard,RolesGuard)
  @Roles('RRHH','ADMIN')
  @ApiBearerAuth()
  @Post()
  create(@Body() createEmpleadoDto: CreateEmpleadoDto) {
    return this.client.send('createEmpleado',createEmpleadoDto).pipe(
      catchError(err => {throw new RpcException(err)})
    );
  }

  @UseGuards(AuthGuard,RolesGuard)
  @Roles('RRHH','ADMIN')
  @ApiBearerAuth()
  @Get()
  findAll(@Query() filterEmpleadosDto: FilterEmpleadosDto) {
    return this.client.send('findAllEmpleados', filterEmpleadosDto).pipe(
      catchError(err => {throw new RpcException(err)})
    );
  }

  @UseGuards(AuthGuard,RolesGuard)
  @Roles('RRHH','ADMIN')
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.client.send('findOneEmpleado', {id}).pipe(
      catchError(err => {throw new RpcException(err)})
    );
  }

  @UseGuards(AuthGuard,RolesGuard)
  @Roles('RRHH','ADMIN')
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateEmpleadoDto: UpdateEmpleadoDto) {
    return this.client.send('updateEmpleado', { id: +id, ...updateEmpleadoDto }).pipe(
      catchError(err => {throw new RpcException(err)})
    );
  }

  @UseGuards(AuthGuard,RolesGuard)
  @Roles('RRHH','ADMIN')
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.client.send('removeEmpleado', {id}).pipe(
      catchError(err => {throw new RpcException(err)})
    );
  }

  @Post('auth/login')
  login(@Body() loginEmpleadoDto: LoginEmpleadoDto) {
    return this.client.send('loginEmpleado', loginEmpleadoDto).pipe(
      catchError(err => {throw new RpcException(err)})
    );
  }

  @UseGuards(AuthGuard)
  @Get('auth/verify')
  verifyToken(@Empleado() empleado:any, @Token() token:any) {

    
    // const empleado = req['empleado'];
    // const token = req['token'];

    return{
      empleado,
      token
    }
    // return this.client.send('authVerifyEmpleado',{});
  }

}
