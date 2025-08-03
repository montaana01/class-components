import { API_PATH, API_URL } from './constants';
import type { ApiResponse, FetchApiOptions } from '../types';

const basePath = `${API_URL}/${API_PATH}`;

export const fetchApi = async <T>(
  options: FetchApiOptions = {}
): Promise<ApiResponse<T>> => {
  const { page, name, id } = options;
  const url = `${basePath}/?${page ? 'page=' + page : 'page=1'}${name ? '&name=' + name : ''}${id ? '&id=' + id : ''}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Error while data loading!');
  return response.json();
};

export const fetchDetailedItemApi = async <T>(id: number): Promise<T> => {
  const response = await fetch(`${basePath}/${id}`);
  if (!response.ok) throw new Error('Error while data loading!');
  return response.json();
};
