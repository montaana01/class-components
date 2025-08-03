import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SearchResult from './index';
import { mockData } from '../../../test-utils/mock-constants.ts';
import { MemoryRouter } from 'react-router-dom';

describe('SearchResult Component', () => {
  it('displays loading message when isLoading is true', () => {
    render(<SearchResult items={[]} isLoading={true} error={null} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays error message when error is present', () => {
    render(
      <SearchResult items={[]} isLoading={false} error="Failed to load" />
    );
    expect(
      screen.getByText('Have some problems: Failed to load')
    ).toBeInTheDocument();
  });

  it('displays "Nothing was found!(" when items is empty and not loading or error', () => {
    render(<SearchResult items={[]} isLoading={false} error={null} />);
    expect(screen.getByText(/nothing was found!/i)).toBeInTheDocument();
  });

  it('renders CardList when items are provided', () => {
    render(
      <MemoryRouter initialEntries={['/search?page=1']}>
        <SearchResult items={mockData.results} isLoading={false} error={null} />
      </MemoryRouter>
    );

    mockData.results.forEach((character) => {
      const heading = screen.getByRole('heading', { name: character.name });
      expect(heading).toBeInTheDocument();
    });
  });
});
