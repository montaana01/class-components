import SearchContainer from '@/components/SearchContainer';
import { fetchApi } from '@/api/apiDriver';
import type {ApiResponse, CharacterDetail, SearchPageProps} from '@/types';

export default async function SearchPage({ searchParams }: SearchPageProps  ) {
  const { params } = await searchParams;
  const page = params ? Number(params) : 1;
  const query = params || '';

  const data: ApiResponse<CharacterDetail> = await fetchApi({
    page,
    query: query || undefined,
  });

  return <SearchContainer initialData={data} />;
}
