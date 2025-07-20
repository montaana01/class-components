import type { ApiResponse } from '../components/SearchContainer';

export type PokeApiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: ApiResponse[];
};

export async function fetchAbilities(
  limit: number,
  paginationUrl?: string
): Promise<PokeApiResponse> {
  const url: string =
    paginationUrl ?? `https://pokeapi.co/api/v2/ability?limit=${limit}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Error while data loading!');
  return response.json();
}
