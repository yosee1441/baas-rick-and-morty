import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { appConfig, databaseConfig } from './../src/configs';
import { AppModule } from '../src/app.module';

describe('AppModule', () => {
  let appModule: TestingModule;

  beforeAll(async () => {
    appModule = await Test.createTestingModule({
      imports: [
        AppModule,
        ConfigModule.forRoot({ load: [appConfig, databaseConfig] }),
        TypeOrmModule.forRoot(databaseConfig()),
      ],
    }).compile();
  });

  it('should be defined', () => {
    expect(appModule).toBeDefined();
  });
});
