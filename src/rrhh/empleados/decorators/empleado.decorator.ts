import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";



export const Empleado = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();

        if(!request.empleado ){
            throw new InternalServerErrorException('Empleado no encontrado en la request - AuthGuard no funciona correctamente');
        }

        return request.empleado;
    }
)