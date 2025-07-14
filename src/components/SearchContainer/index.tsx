import React from 'react';
import { fetchAbilities } from '../../api/pokeApi';
import SearchInput from '../Search/SearchInput';
import SearchButton from '../Search/SearchButton';
import SearchResult from '../Search/SearchResult';

type ApiResponse = {
  name: string;
  url: string;
};

export default class SearchContainer extends React.Component {
  state = {
    searchQuery: '',
    results: [],
    isLoading: false,
    error: null,
  };

  componentDidMount() {
    const savedQuery = localStorage.getItem('searchTerm');
    if (savedQuery) {
      this.setState({ searchQuery: savedQuery }, this.handleSearch);
    } else {
      this.handleSearch();
    }
  }

  handleSearch = async () => {
    const query = this.state.searchQuery.trim().toLowerCase();
    this.setState({ isLoading: true, error: null });

    try {
      const data = await fetchAbilities();
      const filtered = data.filter((item: ApiResponse) =>
        item.name.includes(query)
      );
      localStorage.setItem('searchTerm', query);
      this.setState({ results: filtered });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleInputChange = (value: string) => {
    this.setState({ searchQuery: value });
  };

  render() {
    const { searchQuery, results, isLoading, error } = this.state;

    return (
      <div>
        <SearchInput
          searchQuery={searchQuery}
          onChange={this.handleInputChange}
        />
        <SearchButton onClick={this.handleSearch} />
        <SearchResult items={results} isLoading={isLoading} error={error} />
      </div>
    );
  }
}
