import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';

@Module({
  imports: [HttpModule],
  controllers: [CharacterController],
  providers: [CharacterService],
})
export class CharacterModule {}
