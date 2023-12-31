import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SuccessInterceptor } from './commons/common/interceptors/success.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './commons/common/filters/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { GlobalErrorFilter } from './commons/common/filters/global-error.filter';
import { AxiosErrorFilter } from './commons/common/filters/axios-error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //CORS Setting allow all
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });

  //SuccessInterceptor Setting
  app.useGlobalInterceptors(new SuccessInterceptor());

  //Filter Setting
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new GlobalErrorFilter());
  app.useGlobalFilters(new AxiosErrorFilter());

  //ValidationPipe Setting
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  // Swagger Setting
  const config = new DocumentBuilder()
    .setTitle('Veclix Docs')
    .setDescription('Veclix 0.0.2 API description Enjoy Your Coffee :D')
    .setVersion('0.0.2')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
