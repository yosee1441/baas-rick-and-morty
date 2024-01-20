import { Controller, Get } from '@nestjs/common';
import { CharacterService } from './character.service';

@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Get()
  findAll() {
    return this.characterService.findAll();
  }
}
