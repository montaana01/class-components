import { type AbilityDetail, API_URL, type PokeApiResponse } from './constants';

export async function fetchAbilities(
  limit: number,
  offset: number = 0
): Promise<PokeApiResponse> {
  const response = await fetch(
    `${API_URL}/ability?offset=${offset}&limit=${limit}`
  );
  if (!response.ok) throw new Error('Error while data loading!');
  return response.json();
}

export async function fetchAbilityDetail(
  identifier: string | number
): Promise<AbilityDetail> {
  const url = `${API_URL}/ability/${identifier}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Failed to load ability "${identifier}" (status ${response.status})`
    );
  }
  return response.json();
}
