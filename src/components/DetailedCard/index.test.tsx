import '@testing-library/jest-dom';
import { describe, it, expect, beforeEach, vi, type Mock } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DetailedCard from './index';
import { fetchDetailedItemApi } from '../../api/apiDriver';
import { mockData } from '../../test-utils/mock-constants.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type ReactNode } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

vi.mock('../../api/apiDriver', () => ({
  fetchDetailedItemApi: vi.fn(),
}));

describe('DetailedCard Component', () => {
  const mockOnClose = vi.fn();
  const testItem = mockData.results[0];
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient.clear();
  });

  it('shows loading state initially', () => {
    (fetchDetailedItemApi as Mock).mockImplementation(
      () => new Promise(() => {})
    );

    render(<DetailedCard id={1} onClose={mockOnClose} />, { wrapper: Wrapper });

    expect(screen.getByText('Loading details…')).toBeInTheDocument();
    expect(screen.getByText('× Close')).toBeInTheDocument();
  });

  it('displays error message when request fails', async () => {
    const errorMessage = 'Failed to fetch';
    (fetchDetailedItemApi as Mock).mockRejectedValue(new Error(errorMessage));

    render(<DetailedCard id={1} onClose={mockOnClose} />, { wrapper: Wrapper });

    await waitFor(() => {
      expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
    });
  });

  it('renders character details correctly', async () => {
    (fetchDetailedItemApi as Mock).mockResolvedValue(testItem);

    render(<DetailedCard id={1} onClose={mockOnClose} />, { wrapper: Wrapper });

    await waitFor(() => {
      expect(screen.getByText(testItem.name)).toBeInTheDocument();
      expect(screen.getByAltText(testItem.name)).toHaveAttribute(
        'src',
        testItem.image
      );

      const statusText = screen.getByText(/status:/i).parentElement;
      expect(statusText).toHaveTextContent(`Status: ${testItem.status}`);

      const speciesText = screen.getByText(/species:/i).parentElement;
      expect(speciesText).toHaveTextContent(`Species: ${testItem.species}`);

      const genderText = screen.getByText(/gender:/i).parentElement;
      expect(genderText).toHaveTextContent(`Gender: ${testItem.gender}`);

      const originText = screen.getByText(/origin:/i).parentElement;
      expect(originText).toHaveTextContent(
        `Origin: ${testItem.origin.name === 'unknown' ? 'No information' : testItem.origin.name}`
      );

      const locationText = screen.getByText(/location:/i).parentElement;
      expect(locationText).toHaveTextContent(
        `Location: ${testItem.location.name === 'unknown' ? 'No information' : testItem.location.name}`
      );

      const episodesText = screen.getByText(/episodes:/i).parentElement;
      expect(episodesText).toHaveTextContent(
        `Episodes: ${testItem.episode.length}`
      );

      const createdText = screen.getByText(/created:/i).parentElement;
      expect(createdText).toHaveTextContent(
        `Created: ${new Date(testItem.created).toLocaleDateString()}`
      );
    });
  });

  it('calls onClose when button is clicked', async () => {
    (fetchDetailedItemApi as Mock).mockResolvedValue(testItem);

    render(<DetailedCard id={1} onClose={mockOnClose} />, { wrapper: Wrapper });

    await userEvent.click(await screen.findByText('× Close'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('replaces "unknown" values with "No information"', async () => {
    const unknownItem = {
      ...testItem,
      status: 'unknown',
      species: 'unknown',
      gender: 'unknown',
      origin: { name: 'unknown' },
      location: { name: 'unknown' },
    };
    (fetchDetailedItemApi as Mock).mockResolvedValue(unknownItem);

    render(<DetailedCard id={1} onClose={mockOnClose} />, { wrapper: Wrapper });

    await waitFor(() => {
      const statusText = screen.getByText(/Status:/).parentElement;
      expect(statusText).toHaveTextContent('Status: No information');

      const speciesText = screen.getByText(/Species:/).parentElement;
      expect(speciesText).toHaveTextContent('Species: No information');

      const genderText = screen.getByText(/Gender:/).parentElement;
      expect(genderText).toHaveTextContent('Gender: No information');

      const originText = screen.getByText(/Origin:/).parentElement;
      expect(originText).toHaveTextContent('Origin: No information');

      const locationText = screen.getByText(/Location:/).parentElement;
      expect(locationText).toHaveTextContent('Location: No information');
    });
  });

  it('does not show type if not available', async () => {
    const noTypeItem = { ...testItem, type: undefined };
    (fetchDetailedItemApi as Mock).mockResolvedValue(noTypeItem);

    render(<DetailedCard id={1} onClose={mockOnClose} />, { wrapper: Wrapper });

    await waitFor(() => {
      expect(screen.queryByText('Type:')).not.toBeInTheDocument();
    });
  });
});
