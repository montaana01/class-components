import React from 'react';

interface Props {
  onClick: () => void;
}

const SearchButton: React.FC<Props> = ({ onClick }) => (
  <button onClick={onClick}>Search</button>
);

export default SearchButton;
