import { useEffect, useState } from 'react';
import { fetchApi } from '../../api/apiDriver.ts';
import type {
  ApiResponse,
  CharacterDetail,
  DetailedCardProps,
} from '../../types';
import Button from '../Button';

export default function DetailedCard({ name, onClose }: DetailedCardProps) {
  const [data, setData] = useState<ApiResponse<CharacterDetail>>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const closeButton = <Button title={'× Close'} onClick={onClose} />;

  useEffect(() => {
    async function loadDetail() {
      setIsLoading(true);
      setError(null);

      try {
        const detail = await fetchApi<CharacterDetail>({ name: name });
        setData(detail);
      } finally {
        setIsLoading(false);
      }
    }

    void loadDetail();
  }, [name]);

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

  const detailedItem: CharacterDetail = data.results[0];

  return (
    <div className="detail-container">
      {closeButton}
      <img src={detailedItem.image} alt={detailedItem.name} />
      <p>
        <strong>Status:</strong>{' '}
        {detailedItem.status == 'unknown'
          ? 'No information'
          : detailedItem.status}
      </p>
      <p>
        <strong>Species:</strong>{' '}
        {detailedItem.species == 'unknown'
          ? 'No information'
          : detailedItem.species}
      </p>
      {detailedItem.type && (
        <p>
          <strong>Type:</strong> {detailedItem.type}
        </p>
      )}
      <p>
        <strong>Gender:</strong>{' '}
        {detailedItem.gender == 'unknown'
          ? 'No information'
          : detailedItem.gender}
      </p>
      <p>
        <strong>Origin:</strong>{' '}
        {detailedItem.origin.name == 'unknown'
          ? 'No information'
          : detailedItem.origin.name}
      </p>
      <p>
        <strong>Location:</strong>{' '}
        {detailedItem.location.name == 'unknown'
          ? 'No information'
          : detailedItem.location.name}
      </p>
      <p>
        <strong>Episodes:</strong> {detailedItem.episode.length}
      </p>
      <p>
        <strong>Created:</strong>{' '}
        {new Date(detailedItem.created).toLocaleDateString()}
      </p>
    </div>
  );
}
