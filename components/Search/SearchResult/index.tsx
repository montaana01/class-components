'use client';

import CardList from '../../CardList';
import isEmptyArray from '../../../helpers/isEmpty';
import type { SearchResultProps } from '@/types';

const SearchStateMessage: Record<string, string> = {
  loading: 'Loading...',
  error: 'Have some problems:',
  notFound: 'Nothing was found!',
};

export default function SearchResult({
  items,
  isLoading,
  error,
}: SearchResultProps) {
  if (isLoading) {
    return <p className="padding">{SearchStateMessage.loading}</p>;
  }

  if (error) {
    return (
      <p className="error">
        {SearchStateMessage.error} {error}
      </p>
    );
  }
  if (isEmptyArray(items)) {
    return <p className="padding">{SearchStateMessage.notFound}</p>;
  } else {
    return <CardList items={items} />;
  }
}
