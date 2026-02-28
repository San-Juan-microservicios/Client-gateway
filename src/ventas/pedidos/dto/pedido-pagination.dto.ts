import { PaginationDto } from "src/common";
import { estadoPedido } from "../enum/pedido.enum";
import { IsEnum, IsOptional } from "class-validator";

export class PaginationPedidoDto extends PaginationDto {

    @IsOptional()
    @IsEnum(estadoPedido,{
        message: `El estado del pedido debe ser: ${estadoPedido}`
    })
    estado: estadoPedido
}