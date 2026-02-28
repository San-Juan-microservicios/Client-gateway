import { IsString, IsNotEmpty, IsNumber, IsPositive, IsEnum, IsDateString, isEnum } from "class-validator";
import { rol, rolEmpleadoList } from "../enum/cargo.enum";

export class CreateEmpleadoDto {


    @IsString()
    @IsNotEmpty()
    nombre:string;

    
    @IsString()
    @IsNotEmpty()
    apellido:string;


    @IsString()
    @IsNotEmpty()
    ci: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsEnum(rol,{
        message:`El rol del empleado debe ser: ${rolEmpleadoList}`
    })
    @IsNotEmpty()
    rol: rol;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    sueldo: number;


    

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    tipoId: number;


    @IsDateString()
    @IsNotEmpty()
    fechaIngreso: string;


}
