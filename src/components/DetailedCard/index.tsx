import { useEffect, useState } from 'react';
import { fetchDetailedItemApi } from '../../api/apiDriver.ts';
import type { CharacterDetail, DetailedCardProps } from '../../types';
import Button from '../Button';

export default function DetailedCard({ id, onClose }: DetailedCardProps) {
  const [data, setData] = useState<CharacterDetail>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const closeButton = <Button title={'× Close'} onClick={onClose} />;

  useEffect(() => {
    async function loadDetail() {
      setIsLoading(true);
      setError(null);

      try {
        const detail = await fetchDetailedItemApi<CharacterDetail>(id);
        setData(detail);
      } finally {
        setIsLoading(false);
      }
    }

    void loadDetail();
  }, [id]);

  if (isLoading) {
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
        <p className="error">Error: {error}</p>
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
