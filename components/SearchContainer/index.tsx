'use client';

import { memo, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import useLocalStorage from '@/hooks/useLocalStorage';
import isEmptyArray from '@/helpers/isEmpty';
import { fetchApi } from '@/api/apiDriver';
import SearchInput from '@/components/Search/SearchInput';
import SearchResult from '@/components/Search/SearchResult';
import DetailedCard from '@/components/DetailedCard';
import { FlyOut } from '@/components/FlyOut';
import Button from '@/components/Button';
import type { ApiResponse, CharacterDetail } from '@/types';
import { useSelectedItemsStore } from '@/store/selectedItemsStore';
import { useQuery } from '@tanstack/react-query';

export default memo(function SearchContainer({
  initialData,
}: {
  initialData: ApiResponse<CharacterDetail>;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations('Index');

  const pageParam = searchParams.get('page');
  const queryParam = searchParams.get('query');
  const activeParam = searchParams.get('active');

  const [searchQuery, setSearchQuery] = useLocalStorage('searchTerm', '');
  const { selectedItems } = useSelectedItemsStore();

  const page = pageParam ? Number(pageParam) : 1;
  const query = queryParam || '';
  const active = activeParam || '';

  useEffect(() => {
    if (query) {
      setSearchQuery(query);
    }
  }, [query, setSearchQuery]);

  const { data, isLoading, isError, error, isFetching, refetch } = useQuery({
    queryKey: ['characters', page, query],
    queryFn: () =>
      fetchApi<CharacterDetail>({ page, query: query || undefined }),
    initialData: page === 1 && query === '' ? initialData : undefined,
  });

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set('page', '1');
    if (searchQuery) params.set('query', searchQuery);
    params.delete('active');

    router.push(`${pathname}?${params.toString()}`);
  };

  const handlePageChange = (direction: 'prev' | 'next') => {
    const newPage = direction === 'prev' ? page - 1 : page + 1;
    const params = new URLSearchParams(searchParams.toString());

    params.set('page', newPage.toString());
    if (query) params.set('query', query);
    if (active) params.set('active', active);

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleCloseCard = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('active');
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleRefetch = async () => {
    refetch().catch((error) => console.error(error));
  };

  return (
    <>
      {!isEmptyArray(selectedItems) && (
        <p className={'selection-items'}>
          {t('selectedItems')} <strong>{selectedItems.length}</strong>
        </p>
      )}
      <div className="search-header">
        <FlyOut />
        <div className="search-container">
          <SearchInput
            searchQuery={searchQuery}
            onChange={setSearchQuery}
            onEnter={handleSearch}
            placeholder={t('searchPlaceholder')}
          />
          <Button title={t('search')} onClick={handleSearch} />
          <Button title={t('refresh')} onClick={handleRefetch} />
        </div>
      </div>

      <div className="search-body">
        <div className="search-panel">
          <div className="pagination">
            <Button
              title={'⇦'}
              onClick={() => handlePageChange('prev')}
              disabled={!data || page === 1}
            />
            {page} / {data?.info.pages || 1}
            <Button
              title={'⇨'}
              onClick={() => handlePageChange('next')}
              disabled={!data || page === (data?.info.pages || 1)}
            />
          </div>

          <SearchResult
            items={data?.results || []}
            isLoading={isLoading || isFetching}
            error={isError ? error.message : null}
          />
        </div>

        {active ? (
          <div className="detail-panel">
            <DetailedCard id={Number(active)} onClose={handleCloseCard} />
          </div>
        ) : null}
      </div>
    </>
  );
});
