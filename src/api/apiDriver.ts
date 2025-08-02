import { API_PATH, API_URL } from './constants';
import type { ApiResponse, FetchApiOptions } from '../types';

export async function fetchApi<T>(
  options: FetchApiOptions = {}
): Promise<ApiResponse<T>> {
  const { page, name, active } = options;
  const basePath = `${API_URL}/${API_PATH}`;
  const url = `${basePath}/?${page ? 'page=' + page : ''}${name ? '&name=' + name : ''}${active ? '&active=' + active : ''}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Error while data loading!');
  return response.json();
}
