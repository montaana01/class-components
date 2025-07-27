import { useEffect, useState } from 'react';
import { fetchAbilities, type PokeApiResponse } from '../../api/pokeApi';
import SearchInput from '../Search/SearchInput';
import SearchButton from '../Search/SearchButton';
import SearchResult from '../Search/SearchResult';
import useLocalStorage from '../../hooks/useLocalStorage';

export type ApiResponse = {
  name: string;
  url: string;
};

const productsPerPage = 50;

export default function SearchContainer() {
  const [searchQuery, setSearchQuery] = useLocalStorage<string>(
    'searchTerm',
    ''
  );
  const [results, setResults] = useState<ApiResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nextPageUrl, setNextPageUrl] = useState<string | undefined>();
  const [prevPageUrl, setPrevPageUrl] = useState<string | undefined>();

  async function handleSearch(paginationUrl?: string) {
    const query: string = String(searchQuery).trim().toLowerCase();
    setIsLoading(true);
    setError(null);

    try {
      const data: PokeApiResponse = await fetchAbilities(
        productsPerPage,
        paginationUrl
      );
      const filtered: ApiResponse[] = data.results.filter((item: ApiResponse) =>
        item.name.includes(query)
      );
      localStorage.setItem('searchTerm', query);
      setNextPageUrl(data.next ?? undefined);
      setPrevPageUrl(data.previous ?? undefined);
      setResults(filtered);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    void handleSearch();
  }, []);

  return (
    <>
      <SearchInput
        searchQuery={searchQuery}
        onChange={setSearchQuery}
        onEnter={() => handleSearch()}
      />
      <SearchButton onClick={() => handleSearch()} />
      <SearchResult items={results} isLoading={isLoading} error={error} />
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
            onClick={() => handleSearch(prevPageUrl)}
            disabled={!prevPageUrl}
          >
            ⇦
          </button>
          <button
            onClick={() => handleSearch(nextPageUrl)}
            disabled={!nextPageUrl}
          >
            ⇨
          </button>
        </div>
      )}
    </>
  );
}
