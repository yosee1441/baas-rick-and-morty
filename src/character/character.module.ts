import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import { Character } from './entities';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Character])],
  controllers: [CharacterController],
  providers: [CharacterService],
})
export class CharacterModule {}
