export const API_URL = 'https://pokeapi.co/api/v2';

export type ApiResponse = {
  name: string;
  url: string;
};

export type PokeApiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: ApiResponse[];
};

export type AbilityDetail = {
  effect_changes: {
    version_group: { name: string; url: string };
    effect_entries: {
      effect: string;
      language: { name: string; url: string };
    }[];
  }[];
  effect_entries: {
    effect: string;
    short_effect: string;
    language: { name: string; url: string };
  }[];
  flavor_text_entries: {
    flavor_text: string;
    language: { name: string; url: string };
    version_group: { name: string; url: string };
  }[];
  generation: { name: string; url: string };
  id: number;
  is_main_series: boolean;
  name: string;
  names: {
    language: { name: string; url: string };
    name: string;
  }[];
  pokemon: {
    is_hidden: boolean;
    slot: number;
    pokemon: { name: string; url: string };
  }[];
};
