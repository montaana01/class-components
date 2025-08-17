'use client';

import React from 'react';
import type { SearchInputProps } from '@/types';

export default function SearchInput({
  searchQuery,
  onChange,
  onEnter,
  placeholder,
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
      name="searchQuery"
      type="text"
      value={searchQuery}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
    />
  );
}
