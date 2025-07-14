import React from 'react';
import CardList from '../../CardList';

interface Props {
  items: { name: string; url: string }[];
  isLoading: boolean;
  error: string | null;
}

const SearchResult: React.FC<Props> = ({ items, isLoading, error }) => {
  if (isLoading) return <p className={'padding'}>Loading...</p>;
  if (error) return <p className="error">Error: {error}</p>;
  if (items.length === 0) return <p className={'padding'}>Nothing was found!(</p>;

  return <CardList items={items} />;
};

export default SearchResult;
