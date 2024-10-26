import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app/app.module';

import { envs } from '@app/core/configuration/envs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
    .setTitle('Arrow Digital Desafio API Api docs')
    .setDescription('Aqui se encontra toda a documentação da api do Desafio Arrow Digital.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(Number(envs.PORT));
}

void bootstrap();
