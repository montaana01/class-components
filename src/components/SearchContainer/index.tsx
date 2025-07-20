import React from 'react';
import { fetchAbilities, type PokeApiResponse } from '../../api/pokeApi';
import SearchInput from '../Search/SearchInput';
import SearchButton from '../Search/SearchButton';
import SearchResult from '../Search/SearchResult';

export type ApiResponse = {
  name: string;
  url: string;
};

type State = {
  searchQuery: string;
  results: ApiResponse[];
  isLoading: boolean;
  error: string | null;
  productsPerPage: number;
  nextPageUrl?: string;
  prevPageUrl?: string;
};

export default class SearchContainer extends React.Component {
  state: State = {
    searchQuery: '',
    results: [],
    isLoading: false,
    error: null,
    productsPerPage: 50,
  };

  componentDidMount() {
    const savedQuery: string | null = localStorage.getItem('searchTerm');
    if (savedQuery) {
      this.setState({ searchQuery: savedQuery }, this.handleSearch);
    } else {
      this.handleSearch();
    }
  }

  handleSearch = async (paginationUrl?: string) => {
    const query: string = this.state.searchQuery.trim().toLowerCase();
    this.setState({ isLoading: true, error: null });

    try {
      const data: PokeApiResponse = await fetchAbilities(
        this.state.productsPerPage,
        paginationUrl
      );
      const filtered: ApiResponse[] = data.results.filter((item: ApiResponse) =>
        item.name.includes(query)
      );
      localStorage.setItem('searchTerm', query);
      this.setState({ nextPageUrl: data.next });
      this.setState({ prevPageUrl: data.previous });
      this.setState({ results: filtered });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleInputChange = (value: string) => {
    this.setState({ searchQuery: value });
  };

  render() {
    const { searchQuery, results, isLoading, error, nextPageUrl, prevPageUrl } =
      this.state;

    return (
      <>
        <SearchInput
          searchQuery={searchQuery}
          onChange={this.handleInputChange}
          onEnter={() => this.handleSearch()}
        />
        <SearchButton
          onClick={() => {
            this.handleSearch();
          }}
        />
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
              onClick={() => this.handleSearch(prevPageUrl)}
              disabled={!prevPageUrl}
            >
              ⇦
            </button>
            <button
              onClick={() => this.handleSearch(nextPageUrl)}
              disabled={!nextPageUrl}
            >
              ⇨
            </button>
          </div>
        )}
      </>
    );
  }
}
