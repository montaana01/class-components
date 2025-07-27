import React from 'react';

type SearchInputProps = {
  searchQuery: string;
  onChange: (value: string) => void;
  onEnter: () => void;
};

export default function SearchInput({
  searchQuery,
  onChange,
  onEnter,
}: SearchInputProps) {
  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      onEnter();
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value);
  }

  return (
    <input
      type="text"
      value={searchQuery}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder="Type to search..."
    />
  );
}
