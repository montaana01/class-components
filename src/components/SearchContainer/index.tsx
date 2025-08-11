import { memo, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router';
import useLocalStorage from '../../hooks/useLocalStorage';
import isEmptyArray from '../../helpers/isEmpty';
import { fetchApi } from '../../api/apiDriver.ts';
import SearchInput from '../Search/SearchInput';
import SearchButton from '../Search/SearchButton';
import SearchResult from '../Search/SearchResult';
import DetailedCard from '../DetailedCard';
import { FlyOut } from '../FlyOut';
import Button from '../Button';
import type { CharacterDetail, QueryParams } from '../../types';
import { useSelectedItemsStore } from '../../store/selectedItemsStore.ts';
import { parseQueryParams } from '../../helpers/parseQueryParams';
import { useQuery } from '@tanstack/react-query';

export default memo(function SearchContainer() {
  const query = useLocation();
  const queryParams: QueryParams = useMemo(
    () => parseQueryParams(query.search),
    [query.search]
  );
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useLocalStorage('searchTerm', '');
  const { selectedItems } = useSelectedItemsStore();

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ['characters', queryParams.page, queryParams.query, queryParams],
    queryFn: () =>
      fetchApi<CharacterDetail>({
        page: queryParams.page,
        query: queryParams.query || undefined,
      }),
  });

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set('page', '1');
    if (searchQuery) params.set('query', searchQuery);
    navigate(`/search?${params.toString()}`);
  };

  const handlePageChange = (direction: 'prev' | 'next') => {
    const newPage =
      direction === 'prev'
        ? (queryParams.page || 1) - 1
        : (queryParams.page || 0) + 1;
    const params = new URLSearchParams();
    params.set('page', newPage.toString());
    if (queryParams.query) params.set('query', queryParams.query);
    if (queryParams.active) params.set('active', queryParams.active.toString());

    navigate(`/search?${params.toString()}`);
  };

  const handleCloseCard = () => {
    const params = new URLSearchParams(location.search);
    params.delete('active');
    navigate(`/search?${params.toString()}`);
  };

  return (
    <>
      {!isEmptyArray(selectedItems) && (
        <p className={'selection-items'}>
          Selected items count: <strong>{selectedItems.length}</strong>
        </p>
      )}
      <div className="search-header">
        <FlyOut />
        <div className="search-container">
          <SearchInput
            searchQuery={searchQuery}
            onChange={setSearchQuery}
            onEnter={handleSearch}
          />
          <SearchButton onClick={handleSearch} />
        </div>
      </div>

      <div className="search-body">
        <div className="search-panel">
          <div className="pagination">
            <Button
              title={'⇦'}
              onClick={() => handlePageChange('prev')}
              disabled={!data || queryParams.page === 1}
            />
            {queryParams.page} / {data?.info.pages || 1}
            <Button
              title={'⇨'}
              onClick={() => handlePageChange('next')}
              disabled={!data || queryParams.page === (data?.info.pages || 1)}
            />
          </div>

          <SearchResult
            items={data?.results || []}
            isLoading={isLoading || isFetching}
            error={isError ? error.message : null}
          />
        </div>

        {queryParams.active ? (
          <div className="detail-panel">
            <DetailedCard id={queryParams.active} onClose={handleCloseCard} />
          </div>
        ) : null}
      </div>
    </>
  );
});
