import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('BAAS Rick and Morty API')
    .setDescription(
      'It is an application that stores all the characters from https://rickandmortyapi.com/api/character in a database',
    )
    .setVersion('1.0')
    .addServer('http://localhost:3003/', 'Local environment')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const configService: ConfigService = app.get<ConfigService>(ConfigService);

  app.setGlobalPrefix('api/v1');

  await app.listen(configService.get('port'));
}
bootstrap();
