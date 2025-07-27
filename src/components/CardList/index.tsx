import React from 'react';
import Card from '../Card';

type CardListProps = {
  items: { name: string; url: string }[];
};

export default class CardList extends React.Component<CardListProps> {
  render() {
    const { items } = this.props;
    return (
      <div className="cardList">
        {items.map(({ name, url }) => (
          <Card key={name} name={name} url={url} />
        ))}
      </div>
    );
  }
}
