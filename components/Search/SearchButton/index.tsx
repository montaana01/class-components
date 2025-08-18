'use client';

const SearchButtonText = 'Search';

export default function SearchButton({ onClick }: { onClick: VoidFunction }) {
  return <button onClick={onClick}>{SearchButtonText}</button>;
}
