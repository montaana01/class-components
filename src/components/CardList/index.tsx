import Card from '../Card';

type CardListProps = {
  items: { name: string; url: string }[];
};

export default function CardList({ items }: CardListProps) {
  return (
    <div className="cardList">
      {items.map(({ name, url }) => (
        <Card key={name} name={name} url={url} />
      ))}
    </div>
  );
}
