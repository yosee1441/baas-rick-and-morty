import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HttpModule, HttpService } from '@nestjs/axios';
import { Repository } from 'typeorm';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';
import { HttpStatus, InternalServerErrorException } from '@nestjs/common';

import { CharacterService } from '../../src/character/character.service';
import { Character } from '../../src/character/entities';
import { CharacterPage1, firstCharacter } from '../mocks/character';

type MockType<T> = {
  [P in keyof T]?: jest.Mock;
};

describe('CharacterService', () => {
  let service: CharacterService;
  let httpService: HttpService;

  const repositoryMockFactory: () => MockType<Repository<Character>> = jest.fn(
    () => ({
      save: jest.fn((entity) => entity),
    }),
  );

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        CharacterService,
        {
          provide: getRepositoryToken(Character),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<CharacterService>(CharacterService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const handleApiResponse = ({
      status = HttpStatus.OK,
      statusText,
    }: {
      status: HttpStatus;
      statusText?: string;
    }) => {
      return {
        data: CharacterPage1,
        status,
        statusText,
        headers: {},
        config: {},
      } as AxiosResponse;
    };

    it('should fetch characters and save', async () => {
      jest
        .spyOn(httpService, 'get')
        .mockImplementationOnce(() =>
          of(handleApiResponse({ status: HttpStatus.OK, statusText: 'OK' })),
        );

      await service.create();

      expect(service['characterRepository'].save).toHaveBeenCalledWith({
        jsonbRickAndMorty: firstCharacter,
      });
    });
  });
});
