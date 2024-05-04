import 'dotenv/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger/dist';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './shared/interceptors/response.interceptor';

import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';


const port = process.env.PORT || 8000;
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
  });
  
  app.enableCors({ origin: '*' });
  app.useStaticAssets(join(__dirname, "..", "public"));
  
  app.useGlobalInterceptors(new ResponseInterceptor());
  //const { httpAdapter } = app.get(HttpAdapterHost);
//app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      //forbidNonWhitelisted: true
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Jonapwd API Doc')
    .setDescription('Documentation of the beentos API')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tryItOutEnabled: true,
      showRequestDuration: true,
      docExpansion: 'none',
    },
  });

  await app.listen(port, () => {
    Logger.log(`App running on port ${port}`);
  });
}
bootstrap();
