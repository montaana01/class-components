import Card from '../Card';

type CardListItemProps = {
  name: string;
  url: string;
};

type CardListProps = {
  items: CardListItemProps[];
};

export default function CardList({ items }: CardListProps) {
  return (
    <div className="cardList">
      {items.map(({ name, url }: CardListItemProps) => (
        <Card key={name} name={name} url={url} />
      ))}
    </div>
  );
}
