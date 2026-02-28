import { Catch, ArgumentsHost, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    // Al llamar .getError(), microservicios devuelven objetos muy variables:
    // - A veces { status: 'error', message: [...] }
    // - A veces { message: 'Bad request', error: 'BadRequestException', statusCode: 400 }
    // - A veces un string
    const rpcError = exception.getError();

    let status = HttpStatus.BAD_REQUEST;
    let message = 'Bad Request';

    // Si error es objeto:
    if (typeof rpcError === 'object' && rpcError !== null) {

      // Detectar message
      message = rpcError['message'] ?? message;

      // Detectar statusCode (mejor que status)
      if (typeof rpcError['statusCode'] === 'number') {
        status = rpcError['statusCode'];
      }

      // A veces Nest Microservices manda "status" pero como string 🙄
      if (typeof rpcError['status'] === 'number') {
        status = rpcError['status'];
      }
    }

    // Si error es texto:
    if (typeof rpcError === 'string') {
      message = rpcError;
    }

    // Siempre retorna un statusCode numérico válido
    return response.status(status).json({
      statusCode: status,
      message,
    });
  }
}
