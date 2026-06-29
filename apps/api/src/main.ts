import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: process.env.WEB_ORIGIN ?? 'http://localhost:5173',
    credentials: true,
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Frag API Mailing')
    .setDescription('API de contacto y portafolio para TIC / FragUI.')
    .setVersion('1.0.0')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('frag-api-mailing', app, swaggerDocument);

  const port = Number(process.env.API_PORT ?? process.env.PORT ?? 3000);
  await app.listen(port);

  console.log(`Backend: http://localhost:${port}/api`);
  console.log(`Swagger: http://localhost:${port}/frag-api-mailing`);
}
void bootstrap();
