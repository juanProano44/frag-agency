import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: ['https://frag-agency-api.vercel.app'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Frag API Mailing')
    .setDescription('API de contacto y portafolio para TIC / FragUI.')
    .setVersion('1.0.0')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('frag-api-mailing', app, swaggerDocument);

  const port = Number(process.env.PORT ?? process.env.API_PORT ?? 8080);
  await app.listen(process.env.PORT || process.env.API_PORT || 8080);;

  console.log(`Backend: http://localhost:${port}/api`);
  console.log(`Swagger: http://localhost:${port}/frag-api-mailing`);
}
void bootstrap();
