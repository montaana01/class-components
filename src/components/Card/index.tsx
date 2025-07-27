import React from 'react';

type CardProps = {
  name: string;
  url: string;
};

export default class Card extends React.Component<CardProps> {
  render() {
    const { name, url } = this.props;
    return (
      <a href={url}>
        <strong>{name}</strong>
      </a>
    );
  }
}
