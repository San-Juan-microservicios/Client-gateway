import { PartialType } from '@nestjs/mapped-types';
import { CreateInsumoDto } from './create-insumo.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateInsumoDto extends PartialType(CreateInsumoDto) {

    @IsNumber()
    @IsOptional()
    public cantidad?:number = 0;

}
