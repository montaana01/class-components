import { memo } from 'react';
import './card.scss';
import { useLocation, useNavigate } from 'react-router';
import type { CardProps, CharacterDetail, QueryParams } from '../../types';
import { useSelectedItemsStore } from '../../store/selectedItemsStore.ts';
import { parseQueryParams } from '../../helpers/parseQueryParams';

const inputTitle = {
  addItem: 'Add this Item!',
  removeItem: 'Remove this Item!',
};

export default memo(function Card({ cardOptions }: CardProps) {
  const navigate = useNavigate();
  const query = useLocation();
  const queryParams: QueryParams = parseQueryParams(query.search);
  const { selectedItems, toggleItem } = useSelectedItemsStore();
  const isSelected = selectedItems.some(
    (card: CharacterDetail) => card.id === cardOptions.id
  );

  const handleCardClick = () => {
    const params = new URLSearchParams(query.search);
    params.set('active', cardOptions.id.toString());
    queryParams.active = cardOptions.id;
    navigate(
      `/search?${queryParams.page ? 'page=' + queryParams.page : ''}${queryParams.query ? '&query=' + queryParams.query : ''}${queryParams.active ? '&active=' + queryParams.active : ''}`
    );
  };

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
              ? 'Maybe alive!'
              : cardOptions.status}{' '}
            · {cardOptions.species}
          </p>
          <p>
            From:{' '}
            {cardOptions.location.name === 'unknown'
              ? 'Some location'
              : cardOptions.location.name}
          </p>
          <p>🎬 Appears in {cardOptions.episode.length} episodes</p>
        </div>
      </div>
      <div className={'card-checkbox'}>
        <label htmlFor={cardOptions.id.toString()}>
          {isSelected ? inputTitle.removeItem : inputTitle.addItem}
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
