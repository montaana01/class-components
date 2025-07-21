import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SearchResult from './index';
import { mockData } from '../../../test-utils/mock-constants.ts';

describe('SearchResult Component', () => {
  it('displays loading message when isLoading is true', () => {
    render(<SearchResult items={[]} isLoading={true} error={null} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays error message when error is present', () => {
    render(
      <SearchResult items={[]} isLoading={false} error="Failed to load" />
    );
    expect(screen.getByText('Error: Failed to load')).toBeInTheDocument();
  });

  it('displays "Nothing was found!(" when items is empty and not loading or error', () => {
    render(<SearchResult items={[]} isLoading={false} error={null} />);
    expect(screen.getByText('Nothing was found!(')).toBeInTheDocument();
  });

  it('renders CardList when items are provided', () => {
    render(
      <SearchResult items={mockData.results} isLoading={false} error={null} />
    );
    const linkElements = screen.getAllByRole('link');
    expect(linkElements).toHaveLength(mockData.results.length);

    linkElements.forEach((element, index) => {
      expect(element).toHaveTextContent(mockData.results[index].name);
      expect(element).toHaveAttribute('href', mockData.results[index].url);
    });
  });
});
