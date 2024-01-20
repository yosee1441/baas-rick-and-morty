import { Character } from './character.interface';

export interface CharacterResponse {
  info: CharacterInfo;
  results: Character[];
}

export interface CharacterInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}
