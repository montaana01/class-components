import { fetchDetailedItemApi } from '../../api/apiDriver.ts';
import type { CharacterDetail, DetailedCardProps } from '../../types';
import Button from '../Button';
import { useQuery } from '@tanstack/react-query';

export default function DetailedCard({ id, onClose }: DetailedCardProps) {
  const closeButton = <Button title={'× Close'} onClick={onClose} />;

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['characterDetail', id],
    queryFn: async () => {
      return await fetchDetailedItemApi<CharacterDetail>(id);
    },
  });

  if (isPending || isFetching) {
    return (
      <div className="detail-container">
        {closeButton}
        <p>Loading details…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="detail-container">
        <p className="error">Error: {error.message}</p>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="detail-container">
      {closeButton}
      <h3>
        <strong>{data.name}</strong>{' '}
      </h3>
      <img src={data.image} alt={data.name} />
      <p>
        <strong>Status:</strong>{' '}
        {data.status == 'unknown' ? 'No information' : data.status}
      </p>
      <p>
        <strong>Species:</strong>{' '}
        {data.species == 'unknown' ? 'No information' : data.species}
      </p>
      {data.type && (
        <p>
          <strong>Type:</strong> {data.type}
        </p>
      )}
      <p>
        <strong>Gender:</strong>{' '}
        {data.gender == 'unknown' ? 'No information' : data.gender}
      </p>
      <p>
        <strong>Origin:</strong>{' '}
        {data.origin.name == 'unknown' ? 'No information' : data.origin.name}
      </p>
      <p>
        <strong>Location:</strong>{' '}
        {data.location.name == 'unknown'
          ? 'No information'
          : data.location.name}
      </p>
      <p>
        <strong>Episodes:</strong> {data.episode.length}
      </p>
      <p>
        <strong>Created:</strong> {new Date(data.created).toLocaleDateString()}
      </p>
    </div>
  );
}
