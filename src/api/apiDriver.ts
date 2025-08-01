import { API_PATH, API_URL, type ApiResponse } from './constants';

export type FetchApiOptions = {
  paginationUrl?: string;
  name?: string;
};

export async function fetchApi<T>(
  options: FetchApiOptions = {}
): Promise<ApiResponse<T>> {
  const { paginationUrl, name } = options;

  let url: string;
  if (paginationUrl) {
    url = paginationUrl;
  } else {
    const baseUrl = `${API_URL}/${API_PATH}`;
    url = name ? `${baseUrl}/?name=${String(name).trim()}` : baseUrl;
  }
  const response = await fetch(url);
  if (!response.ok) throw new Error('Error while data loading!');
  return response.json();
}
