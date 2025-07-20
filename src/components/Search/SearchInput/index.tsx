import React from 'react';

type Props = {
  searchQuery: string;
  onChange: (value: string) => void;
  onEnter: () => void;
};

const SearchInput: React.FC<Props> = ({ searchQuery, onChange, onEnter }) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && onEnter) {
      onEnter();
    }
  };

  return (
    <input
      type="text"
      value={searchQuery}
      onChange={(event) => onChange(event.target.value)}
      onKeyDown={handleKeyDown}
      placeholder="Type to search..."
    />
  );
};
export default SearchInput;
