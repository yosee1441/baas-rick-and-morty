import { Test, TestingModule } from '@nestjs/testing';

import { CharacterController } from '../../src/character/character.controller';
import { CharacterService } from '../../src/character/character.service';

describe('CharacterController', () => {
  let controller: CharacterController;
  let characterService: CharacterService;

  const mockCharacterService = {
    create: jest.fn().mockImplementation(() => Promise.resolve({ ok: 1 })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CharacterController],
      providers: [
        CharacterService,
        {
          provide: CharacterService,
          useValue: mockCharacterService,
        },
      ],
    }).compile();

    controller = module.get<CharacterController>(CharacterController);
    characterService = module.get<CharacterService>(CharacterService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(characterService).toBeDefined();
  });

  describe('createCharacters', () => {
    it('should create characters', async () => {
      const result = { ok: 1 };

      jest
        .spyOn(characterService, 'create')
        .mockImplementation(() => Promise.resolve(result));

      expect(await controller.createCharacters()).toBe(result);
    });
  });
});
