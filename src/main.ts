import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Password Manager')
    .setDescription(
      'Password Manager is an API Rest to generate and store users passwords.',
    )
    .setVersion('0.0.1')
    .addTag('User')
    .addTag('Uptime')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('password-manager/docs', app, document);

  app.setGlobalPrefix('password-manager');
  await app.listen(3000);
}
bootstrap();
