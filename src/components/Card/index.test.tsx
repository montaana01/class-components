import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from './index';
import SearchResult from '../Search/SearchResult';
import { mockData } from '../../test-utils/mock-constants.ts';
import { MemoryRouter } from 'react-router';

describe('Card Component', () => {
  it('does not render anchor when url is missing', () => {
    render(
      <MemoryRouter initialEntries={['/search?page=1']}>
        <Card options={{ ...mockData.results[3], url: '' }} />
      </MemoryRouter>
    );
    const linkElement = screen.queryByRole('link');
    expect(linkElement).not.toBeInTheDocument();
  });

  it('renders CardList when items are provided', () => {
    render(
      <MemoryRouter initialEntries={['/search?page=1']}>
        <SearchResult items={mockData.results} isLoading={false} error={null} />
      </MemoryRouter>
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
