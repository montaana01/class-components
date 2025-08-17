'use client';

import { memo, useCallback } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import type { CardProps, CharacterDetail } from '@/types';
import { useSelectedItemsStore } from '@/store/selectedItemsStore';
import { useTranslations } from 'next-intl';

export default memo(function Card({ cardOptions }: CardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations('Card');
  const { selectedItems, toggleItem } = useSelectedItemsStore();

  const isSelected = selectedItems.some(
    (card: CharacterDetail) => card.id === cardOptions.id
  );

  const handleCardClick = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('active', cardOptions.id.toString());
    router.push(`${pathname}?${params.toString()}`);
  }, [cardOptions.id, pathname, router, searchParams]);

  return (
    <div className={'card'}>
      <div
        className={'card-shadow'}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${cardOptions.image})`,
        }}
      />
      <div className={'card-container'} onClick={handleCardClick}>
        <h2>{cardOptions.name}</h2>
        <div>
          <p>
            {cardOptions.status === 'unknown'
              ? t('statusUnknown')
              : cardOptions.status}{' '}
            · {cardOptions.species}
          </p>
          <p>
            {t('from')}:{' '}
            {cardOptions.location.name === 'unknown'
              ? t('locationUnknown')
              : cardOptions.location.name}
          </p>
          <p>{t('episodesCount', { count: cardOptions.episode.length })}</p>
        </div>
      </div>
      <div className={'card-checkbox'}>
        <label htmlFor={cardOptions.id.toString()}>
          {isSelected ? t('removeItem') : t('addItem')}
        </label>
        <input
          id={cardOptions.id.toString()}
          type={'checkbox'}
          checked={isSelected}
          onChange={() => toggleItem(cardOptions)}
        />
      </div>
    </div>
  );
});
