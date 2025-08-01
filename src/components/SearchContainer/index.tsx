import { useEffect, useState } from 'react';
import { fetchApi, type FetchApiOptions } from '../../api/apiDriver.ts';
import SearchInput from '../Search/SearchInput';
import SearchButton from '../Search/SearchButton';
import SearchResult from '../Search/SearchResult';
import useLocalStorage from '../../hooks/useLocalStorage';
import {
  API_PATH,
  API_URL,
  type CharacterDetail,
} from '../../api/constants.ts';
import { useParams } from 'react-router';

export default function SearchContainer() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nextPageUrl, setNextPageUrl] = useState<string | undefined>();
  const [prevPageUrl, setPrevPageUrl] = useState<string | undefined>();

  const [recordsCount, setRecordsCount] = useState<number>(0);
  const [records, setRecords] = useState<CharacterDetail[]>([]);
  const params = useParams();
  const [searchInput, setSearchInput] = useState(params.search || '');
  const [searchQuery, setSearchQuery] = useLocalStorage(
    'searchTerm',
    params.search || ''
  );

  function getProducts(options: FetchApiOptions) {
    setIsLoading(true);
    setError(null);
    try {
      fetchApi<CharacterDetail>(options)
        .then((data) => {
          setNextPageUrl(data.info.next ?? undefined);
          setPrevPageUrl(data.info.prev ?? undefined);
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
    setSearchInput(searchQuery);
  }, []);

  useEffect(() => {
    const trimmedQuery = searchQuery.trim();
    setIsLoading(true);
    setError(null);

    const fetchOptions =
      trimmedQuery !== ''
        ? { name: trimmedQuery }
        : { paginationUrl: `${API_URL}/${API_PATH}/?page=${currentPage}` };

    getProducts(fetchOptions);
  }, [currentPage, searchQuery]);

  function handleSearch() {
    setCurrentPage(1);
    setTotalPages(1);
    setSearchQuery(searchInput);
  }

  return (
    <>
      <SearchInput
        searchQuery={searchInput}
        onChange={setSearchInput}
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
              setCurrentPage((page) => Math.max(page - 1, 1));
              getProducts({ paginationUrl: prevPageUrl });
            }}
            disabled={!records || recordsCount === 1 || currentPage === 1}
          >
            ⇦
          </button>
          {currentPage} / {totalPages}
          <button
            onClick={() => {
              setCurrentPage((page) => page + 1);
              getProducts({ paginationUrl: nextPageUrl });
            }}
            disabled={
              !records ||
              recordsCount <= 1 ||
              currentPage === Math.floor(totalPages)
            }
          >
            ⇨
          </button>
        </div>
      )}
    </>
  );
}
