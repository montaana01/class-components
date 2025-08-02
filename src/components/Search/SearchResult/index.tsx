import CardList from '../../CardList';
import type { CharacterDetail } from '../../../api/constants.ts';
import isEmptyArray from '../../../helpers/isEmpty.ts';

const SearchStateMessage: Record<string, string> = {
  loading: 'Loading...',
  error: 'Have some problems:',
  notFound: 'Nothing was found!',
};

type SearchResultProps = {
  items: CharacterDetail[];
  isLoading: boolean;
  error: string | null;
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
