import React from 'react';

interface Props {
  name: string;
  url: string;
}

const Card: React.FC<Props> = ({ name, url }) => (
  <a href={url}>
    <strong>{name}</strong>
  </a>
);

export default Card;
