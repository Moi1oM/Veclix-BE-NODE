import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SuccessInterceptor } from './commons/common/interceptors/success.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './commons/common/filters/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //CORS Setting
  app.enableCors();

  //SuccessInterceptor Setting
  app.useGlobalInterceptors(new SuccessInterceptor());

  //Validation Setting
  app.useGlobalPipes(new ValidationPipe());

  //Filter Setting
  app.useGlobalFilters(new HttpExceptionFilter());

  // Swagger Setting
  const config = new DocumentBuilder()
    .setTitle('Veclix Docs')
    .setDescription('Veclix 0.0.2 API description')
    .setVersion('0.0.2')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
