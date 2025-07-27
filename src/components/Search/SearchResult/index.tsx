import CardList from '../../CardList';

const SearchStateMessage: Record<string, string> = {
  loading: 'Loading...',
  error: 'Error:',
  notFound: 'Nothing was found!',
};

type SearchResultProps = {
  items: { name: string; url: string }[];
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

  if (items.length === 0) {
    return <p className="padding">{SearchStateMessage.notFound}</p>;
  }

  return <CardList items={items} />;
}
