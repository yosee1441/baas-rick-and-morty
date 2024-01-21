import { Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CharacterService } from './character.service';

@ApiTags('Character')
@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Post()
  @ApiOperation({
    summary: 'Create an characters',
  })
  @ApiResponse({
    status: 201,
    description: 'Successful Response',
    schema: { example: { ok: 1 } },
  })
  createCharacters() {
    return this.characterService.create();
  }
}
