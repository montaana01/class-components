export const API_URL = 'https://rickandmortyapi.com/api';
export const API_PATH = 'character';

export type ApiResponseRecord = {
  name: string;
  url: string;
};

export type ApiResponse<T> = {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: T[];
};

export type CharacterDetail = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: ApiResponseRecord;
  location: ApiResponseRecord;
  image: string;
  episode: string[];
  url: string;
  created: string;
};
