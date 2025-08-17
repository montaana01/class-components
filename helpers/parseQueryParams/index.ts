import type { QueryParams } from '../../types';

export const parseQueryParams = (searchQuery: string): QueryParams => {
  const params = new URLSearchParams(searchQuery);
  return {
    page: Number(params.get('page') || '1'),
    query: params.get('query') || '',
    active: Number(params.get('active') || ''),
  };
};
