import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from '../src/app.module';

describe('Main', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    const documentBuilder = new DocumentBuilder()
      .setTitle('BAAS Rick and Morty API')
      .setDescription(
        'It is an application that stores all the characters from https://rickandmortyapi.com/api/character in a database',
      )
      .setVersion('1.0')
      .addServer('http://localhost:3003/', 'Local environment')
      .build();

    const document = SwaggerModule.createDocument(app, documentBuilder);
    SwaggerModule.setup('docs', app, document);

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );

    app.setGlobalPrefix('api/v1');

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });
});
