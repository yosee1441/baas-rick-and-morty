import { Injectable } from '@nestjs/common';

@Injectable()
export class CharacterService {
  findAll() {
    return `This action returns all character`;
  }
}
