import React from 'react';

type Props = {
  searchQuery: string;
  onChange: (value: string) => void;
};

const SearchInput: React.FC<Props> = ({ searchQuery, onChange }) => (
  <input
    type="text"
    value={searchQuery}
    onChange={(event) => onChange(event.target.value)}
    placeholder="Type to search..."
  />
);

export default SearchInput;
