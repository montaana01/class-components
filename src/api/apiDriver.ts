import { API_PATH, API_URL, type ApiResponse } from './constants';

export type FetchApiOptions = {
  page?: string;
  name?: string;
};

export async function fetchApi<T>(
  options: FetchApiOptions = {}
): Promise<ApiResponse<T>> {
  const { page, name } = options;
  const url = `${API_URL}/${API_PATH}/?${page ? 'page=' + page : ''}${name ? '&name=' + name : ''}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Error while data loading!');
  return response.json();
}
