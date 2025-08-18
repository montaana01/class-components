'use client';

import { fetchDetailedItemApi } from '@/api/apiDriver.ts';
import type { CharacterDetail, DetailedCardProps } from '@/types';
import Button from '../Button';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function DetailedCard({ id, onClose }: DetailedCardProps) {
  const t = useTranslations('DetailedCard');

  const fieldLabels = {
    status: t('status'),
    species: t('species'),
    type: t('type'),
    gender: t('gender'),
    origin: t('origin'),
    location: t('location'),
    episodes: t('episodes'),
    created: t('created'),
  };

  const closeButton = <Button title={`× ${t('close')}`} onClick={onClose} />;

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
        <p>{t('loading')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="detail-container">
        {closeButton}
        <p className="error">{t('error', { message: error.message })}</p>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const formatValue = (value: string) => {
    return value === 'unknown' ? t('noInformation') : value;
  };

  return (
    <div className="detail-container">
      {closeButton}
      <h3>
        <strong>{data.name}</strong>
      </h3>
      <Image
        src={data.image}
        alt={data.name}
        width={200}
        height={200}
        priority
      />

      <p>
        <strong>{fieldLabels.status}:</strong> {formatValue(data.status)}
      </p>
      <p>
        <strong>{fieldLabels.species}:</strong> {formatValue(data.species)}
      </p>
      {data.type && (
        <p>
          <strong>{fieldLabels.type}:</strong> {formatValue(data.type)}
        </p>
      )}
      <p>
        <strong>{fieldLabels.gender}:</strong> {formatValue(data.gender)}
      </p>
      <p>
        <strong>{fieldLabels.origin}:</strong> {formatValue(data.origin.name)}
      </p>
      <p>
        <strong>{fieldLabels.location}:</strong>{' '}
        {formatValue(data.location.name)}
      </p>
      <p>
        <strong>{fieldLabels.episodes}:</strong> {data.episode.length}
      </p>
      <p>
        <strong>{fieldLabels.created}:</strong>{' '}
        {new Date(data.created).toLocaleDateString()}
      </p>
    </div>
  );
}
