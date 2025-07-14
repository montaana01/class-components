import React from 'react';
import Card from '../Card';

interface Props {
  items: { name: string; url: string }[];
}

const CardList: React.FC<Props> = ({ items }) => (
  <div className="cardList">
    {items.map((item) => (
      <Card key={item.name} name={item.name} url={item.url} />
    ))}
  </div>
);

export default CardList;
