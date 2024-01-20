import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { appConfig, databaseConfig } from './configs';
import { CharacterModule } from './character/character.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [appConfig, databaseConfig] }),
    TypeOrmModule.forRoot(databaseConfig()),
    CharacterModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
