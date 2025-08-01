import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from './index';
import SearchResult from '../Search/SearchResult';
import { mockData } from '../../test-utils/mock-constants.ts';

describe('Card Component', () => {
  const baseUrl = 'https://example.com';
  it('renders an anchor with the correct href and name inside component', () => {
    render(<Card options={mockData.results[3]} />);
    const linkElement = screen.getByRole('link');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', baseUrl);
    expect(linkElement).toHaveTextContent('Example');
  });

  it('does not render anchor when url is missing', () => {
    render(<Card options={{ ...mockData.results[3], url: '' }} />);
    const linkElement = screen.queryByRole('link');
    expect(linkElement).not.toBeInTheDocument();
  });

  it('renders CardList when items are provided', () => {
    render(
      <SearchResult items={mockData.results} isLoading={false} error={null} />
    );

    mockData.results.forEach((character) => {
      expect(
        screen.getByRole('heading', { name: character.name })
      ).toBeInTheDocument();
    });

    const headings = screen.getAllByRole('heading', { level: 2 });
    expect(headings).toHaveLength(mockData.results.length);
  });
});
