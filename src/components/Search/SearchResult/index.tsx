import React from 'react';
import CardList from '../../CardList';

interface SearchResultProps {
  items: { name: string; url: string }[];
  isLoading: boolean;
  error: string | null;
}

export default class SearchResult extends React.Component<SearchResultProps> {
  render() {
    const { items, isLoading, error } = this.props;

    if (isLoading) {
      return <p className="padding">Loading...</p>;
    }

    if (error) {
      return <p className="error">Error: {error}</p>;
    }

    if (items.length === 0) {
      return <p className="padding">Nothing was found!(</p>;
    }

    return <CardList items={items} />;
  }
}
