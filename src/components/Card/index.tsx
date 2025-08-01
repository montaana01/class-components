import type { CharacterDetail } from '../../api/constants.ts';
import './card.scss';

type CardProps = {
  options: CharacterDetail;
};

export default function Card({ options }: CardProps) {
  return (
    <div className={'card'}>
      <div
        className={'card-shadow'}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${options.image})`,
        }}
      />
      <div className={'card-container'}>
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
    </div>
  );
}
