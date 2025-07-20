import React from 'react';
import Card from '../Card';

interface CardListProps {
  items: { name: string; url: string }[];
}

export default class CardList extends React.Component<CardListProps> {
  render() {
    const { items } = this.props;
    return (
      <div className="cardList">
        {items.map((item) => (
          <Card key={item.name} name={item.name} url={item.url} />
        ))}
      </div>
    );
  }
}
