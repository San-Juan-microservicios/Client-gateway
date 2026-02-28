import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { RpcCustomExceptionFilter } from './common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('Main-Gateway');

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      transform:true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  )
  app.enableCors({
    origin: 'http://localhost:4200', // Tu frontend Angular
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });


    const config = new DocumentBuilder()
    .setTitle('Distribuidora San Juan API')
    .setDescription('Documentación de la API del Client Gateway')
    .setVersion('1.0')
    .addBearerAuth() // Si usas autenticación JWT
    .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);


  app.useGlobalFilters(new RpcCustomExceptionFilter());

  await app.listen(envs.port);
  logger.log(`Client-Gateway running on port: ${envs.port}`)
}
bootstrap();
