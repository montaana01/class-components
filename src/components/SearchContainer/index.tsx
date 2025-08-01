import { useEffect, useState } from 'react';
import { fetchApi, type FetchApiOptions } from '../../api/apiDriver.ts';
import SearchInput from '../Search/SearchInput';
import SearchButton from '../Search/SearchButton';
import SearchResult from '../Search/SearchResult';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useLocation, useNavigate } from 'react-router';
import { type CharacterDetail } from '../../api/constants.ts';

type QueryParams = { page?: number; query?: string; active?: string };

export default function SearchContainer() {
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [recordsCount, setRecordsCount] = useState<number>(0);
  const [records, setRecords] = useState<CharacterDetail[]>([]);
  const query = useLocation();
  const queryParams: QueryParams = query.search
    .split('?')[1]
    .split('&')
    .reduce((acc, el) => {
      const params = el.split('=');
      acc[params[0]] = params[1];
      return acc;
    }, {});
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useLocalStorage('searchTerm', '');

  async function getProducts(options: FetchApiOptions) {
    setIsLoading(true);
    setError(null);
    try {
      await fetchApi<CharacterDetail>(options)
        .then((data) => {
          setRecordsCount(data.info.count);
          setTotalPages(data.info.pages);
          setRecords(data.results);
        })
        .catch((error) => {
          setError(error.message || 'Data fetch error');
          setRecords([]);
        })
        .finally(() => setIsLoading(false));
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    navigate(
      `/search/?${queryParams.page ? 'page=' + queryParams.page : ''}${searchQuery ? '&query=' + searchQuery : ''}`
    );
    return () => {
      setSearchQuery(searchQuery);
    };
  }, []);
  useEffect(() => {
    const trimmedQuery = searchQuery.trim();
    setIsLoading(true);
    setError(null);

    let fetchOptions = {};
    if (trimmedQuery !== '') {
      fetchOptions = {
        ...fetchOptions,
        name: trimmedQuery,
      };
    }
    if (queryParams.page) {
      fetchOptions = {
        ...fetchOptions,
        page: queryParams.page,
      };
    }
    getProducts(fetchOptions).catch((error) => {
      setError(error.message || 'Data fetch error');
    });
  }, [queryParams.page, queryParams.query]);

  function handleSearch() {
    console.log(searchQuery);
    navigate(`/search?page=1${searchQuery ? '&query=' + searchQuery : ''}`);
    setTotalPages(1);
  }

  return (
    <>
      <SearchInput
        searchQuery={searchQuery}
        onChange={setSearchQuery}
        onEnter={() => handleSearch()}
      />
      <SearchButton onClick={() => handleSearch()} />
      <SearchResult items={records} isLoading={isLoading} error={error} />
      {!isLoading && (
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <button
            onClick={() => {
              navigate(
                `/search?page=${+(queryParams.page || 0) - 1}${searchQuery ? '&query=' + searchQuery : ''}`
              );
            }}
            disabled={
              !records || recordsCount === 1 || +(queryParams.page || 0) === 1
            }
          >
            ⇦
          </button>
          {Number(queryParams.page)} / {totalPages}
          <button
            onClick={() => {
              navigate(
                `/search?page=${+(queryParams.page || 0) + 1}${searchQuery ? '&query=' + searchQuery : ''}`
              );
            }}
            disabled={
              !records ||
              recordsCount <= 1 ||
              +(queryParams.page || 0) === Math.floor(totalPages)
            }
          >
            ⇨
          </button>
        </div>
      )}
    </>
  );
}
