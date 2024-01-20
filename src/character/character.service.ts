import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';

// import { Character } from './entities';
import { CharacterResponse } from './interfaces';
import { AxiosError } from 'axios';

@Injectable()
export class CharacterService {
  /**
   * Here, we have used data mapper approch for this tutorial that is why we
   * injecting repository here. Another approch can be Active records.
   */
  constructor(
    // @InjectRepository(Character)
    // private readonly characterRepository: Repository<Character>,
    private readonly httpService: HttpService,
  ) {}

  async findAll(): Promise<CharacterResponse> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<CharacterResponse>('https://rickandmortyapi.com/api/character')
        .pipe(
          catchError((error: AxiosError) => {
            throw `An error happened. Msg: ${JSON.stringify(
              error?.response?.data,
            )}`;
          }),
        ),
    );
    return data;
  }
}
