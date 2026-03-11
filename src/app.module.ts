import { Module } from '@nestjs/common';
import { ProductosModule } from './almacenes/productos/productos.module';
import { ProveedoresModule } from './almacenes/proveedores/proveedores.module';
import { InsumosModule } from './almacenes/insumos/insumos.module';
import { PedidosModule } from './ventas/pedidos/pedidos.module';
import { ClientesModule } from './ventas/clientes/clientes.module';
import { NatsModule } from './nats/nats.module';
import { EmpleadosModule } from './rrhh/empleados/empleados.module';
import { TiposModule } from './rrhh/tipos/tipos.module';
import { PermisosModule } from './rrhh/permisos/permisos.module';
import { ProductosReportesModule } from './reportes/productos-reportes/productos-reportes.module';
import { InsumosReportesModule } from './reportes/insumos-reportes/insumos-reportes.module';
import { PedidosReportesModule } from './reportes/pedidos-reportes/pedidos-reportes.module';
import { PermisosReportesModule } from './reportes/permisos-reportes/permisos-reportes.module';
import { AsistenciaModule } from './rrhh/asistencia/asistencia.module';
import { PlanillasModule } from './rrhh/planillas/planillas.module';

@Module({
  imports: [ProductosModule, ProveedoresModule, InsumosModule, PedidosModule, ClientesModule, NatsModule, EmpleadosModule, TiposModule, PermisosModule, ProductosReportesModule, InsumosReportesModule, PedidosReportesModule, PermisosReportesModule, AsistenciaModule, PlanillasModule,],
  controllers: [],
  providers: [],
})
export class AppModule {}
