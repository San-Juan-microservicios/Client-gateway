import { IsNumber, IsPositive } from "class-validator";



export class PedidoItemDto {

    @IsNumber()
    @IsPositive()
    idProducto: number

    @IsNumber()
    @IsPositive()
    cantidad: number;

    @IsNumber()
    @IsPositive()
    precio: number;

}