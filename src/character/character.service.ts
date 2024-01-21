import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

import { Character } from './entities';
import {
  CharacterResponse,
  Character as CharacterInterface,
} from './interfaces';

@Injectable()
export class CharacterService {
  private readonly baseUrl = 'https://rickandmortyapi.com/api/character';

  /**
   * Here, we have used data mapper approch for this tutorial that is why we
   * injecting repository here. Another approch can be Active records.
   */
  constructor(
    @InjectRepository(Character)
    private readonly characterRepository: Repository<Character>,
    private readonly httpService: HttpService,
  ) {}

  async create(): Promise<{ ok: number }> {
    let allCharacters: CharacterInterface[] = [];
    let nextPage = `${this.baseUrl}?page=1`;

    while (nextPage) {
      const { data } = await firstValueFrom(
        this.httpService.get<CharacterResponse>(nextPage),
      );
      allCharacters = allCharacters.concat(data.results);
      nextPage = data.info.next;
    }

    for (const character of allCharacters) {
      await this.characterRepository.save({
        jsonbRickAndMorty: character,
      });
    }

    return { ok: 1 };
  }
}
