import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from './index';
import SearchResult from '../Search/SearchResult';
import { mockData } from '../../test-utils/mock-constants.ts';

describe('Card Component', () => {
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
