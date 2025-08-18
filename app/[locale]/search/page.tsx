import SearchContainer from '@/components/SearchContainer';
import { fetchApi } from '@/api/apiDriver';
import type { ApiResponse, CharacterDetail } from '@/types';

export default async function SearchPage() {
  const data: ApiResponse<CharacterDetail> = await fetchApi({});

  return <SearchContainer initialData={data} />;
}
