import Card from '../Card';
import type { CardListProps, CharacterDetail } from '../../types';

export default function CardList({ items }: CardListProps) {
  return (
    <div className="card-list">
      {items.map((item: CharacterDetail) => (
        <Card key={item.id} cardOptions={item} />
      ))}
    </div>
  );
}
