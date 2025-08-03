import './card.scss';
import { useLocation, useNavigate } from 'react-router';
import type { CardProps, QueryParams } from '../../types';

export default function Card({ options }: CardProps) {
  const navigate = useNavigate();
  const query = useLocation();
  const queryParams: QueryParams = query.search
    .split('?')[1]
    .split('&')
    .reduce((acc, el) => {
      const params = el.split('=');
      acc[params[0]] = params[1];
      return acc;
    }, {});

  const handleCardClick = () => {
    queryParams.active = options.name;
    navigate(
      `/search?${queryParams.page ? 'page=' + queryParams.page : ''}${queryParams.query ? '&query=' + queryParams.query : ''}${queryParams.active ? '&active=' + queryParams.active : ''}`
    );
  };

  const handleCheckboxClick = () => {
    return null;
  };

  return (
    <div className={'card'}>
      <div
        className={'card-shadow'}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${options.image})`,
        }}
      />
      <div className={'card-container'} onClick={handleCardClick}>
        <h2>{options.name}</h2>
        <div>
          <p>
            {options.status === 'unknown' ? 'Maybe alive!' : options.status} ·{' '}
            {options.species}
          </p>
          <p>
            From:{' '}
            {options.location.name === 'unknown'
              ? 'Some location'
              : options.location.name}
          </p>
          <p>🎬 Appears in {options.episode.length} episodes</p>
        </div>
      </div>
      <div className={'card-checkbox'}>
        <label htmlFor={options.name}>Add this Item!</label>
        <input
          id={options.name}
          type={'checkbox'}
          onChange={handleCheckboxClick}
        />
      </div>
    </div>
  );
}
