import '@testing-library/jest-dom';
import { describe, it, expect, beforeEach, vi, type Mock } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DetailedCard from './index';
import { fetchDetailedItemApi } from '../../api/apiDriver';
import { mockData } from '../../test-utils/mock-constants.ts';

vi.mock('../../api/apiDriver', () => ({
  fetchDetailedItemApi: vi.fn(),
}));

describe('DetailedCard Component', () => {
  const mockOnClose = vi.fn();
  const testItem = mockData.results[0];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows loading state initially', () => {
    (fetchDetailedItemApi as Mock).mockImplementation(
      () => new Promise(() => {})
    );

    render(<DetailedCard id={1} onClose={mockOnClose} />);

    expect(screen.getByText('Loading details…')).toBeInTheDocument();
    expect(screen.getByText('× Close')).toBeInTheDocument();
  });

  it('calls onClose when button is clicked', async () => {
    (fetchDetailedItemApi as Mock).mockResolvedValue(testItem);

    render(<DetailedCard id={1} onClose={mockOnClose} />);

    await userEvent.click(await screen.findByText('× Close'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('does not show type if not available', async () => {
    const noTypeItem = { ...testItem, type: undefined };
    (fetchDetailedItemApi as Mock).mockResolvedValue(noTypeItem);

    render(<DetailedCard id={1} onClose={mockOnClose} />);

    await waitFor(() => {
      expect(screen.queryByText('Type:')).not.toBeInTheDocument();
    });
  });
});
