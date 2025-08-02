import Card from '../Card';
import type { CharacterDetail } from '../../api/constants.ts';

type CardListProps = {
  items: CharacterDetail[];
};

export default function CardList({ items }: CardListProps) {
  return (
    <div className="cardList">
      {items.map((item: CharacterDetail) => (
        <Card key={item.id} options={item} />
      ))}
    </div>
  );
}
