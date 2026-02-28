import { ArrayMinSize, IsArray, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { PedidoItemDto } from "./pedido-item.dto";

export class CreatePedidoDto {

    @IsNumber()
    idCliente: number;

    @IsOptional()
    @IsString()
    descripcion?: string;

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({each: true})
    @Type(()=> PedidoItemDto)
    items: PedidoItemDto[]

}

