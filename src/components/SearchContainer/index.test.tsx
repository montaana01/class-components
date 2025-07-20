import '@testing-library/jest-dom';
import { describe, beforeEach, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchContainer from './index';
import { fetchAbilities } from '../../api/pokeApi';
import { mockData } from '../../test-utils/mock-constants.ts';

vi.mock('../../api/pokeApi', () => ({
  fetchAbilities: vi.fn(),
}));

describe('SearchContainer', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('initial load with no saved query should fetch data and display results', async () => {
    const fetchAbilitiesMock = vi.mocked(fetchAbilities);
    fetchAbilitiesMock.mockResolvedValue(mockData);

    render(<SearchContainer />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(mockData.results[0].name)).toBeInTheDocument();
      expect(screen.getByText(mockData.results[25].name)).toBeInTheDocument();
    });
    expect(localStorage.getItem('searchTerm')).toBe('');
  });

  it('initial load with saved query should use it for filtering', async () => {
    localStorage.setItem('searchTerm', mockData.results[0].name);
    const fetchAbilitiesMock = vi.mocked(fetchAbilities);
    fetchAbilitiesMock.mockResolvedValue(mockData);

    render(<SearchContainer />);
    await waitFor(() => {
      expect(screen.getByText(mockData.results[0].name)).toBeInTheDocument();
    });

    expect(
      screen.queryByText(mockData.results[1].name)
    ).not.toBeInTheDocument();
    const inputElement: HTMLInputElement = screen.getByRole('textbox');
    expect(inputElement.value).toBe(mockData.results[0].name);
  });

  it('updates input value and triggers search on button click', async () => {
    const fetchAbilitiesMock = vi.mocked(fetchAbilities);
    fetchAbilitiesMock.mockResolvedValue(mockData);

    render(<SearchContainer />);
    const user = userEvent.setup();

    const input = screen.getByRole('textbox');
    await user.type(input, mockData.results[10].name);
    const searchButton = screen.getByRole('button', { name: /search/i });
    await user.click(searchButton);
    await waitFor(() => {
      expect(screen.getByText(mockData.results[10].name)).toBeInTheDocument();
    });

    expect(
      screen.queryByText(mockData.results[12].name)
    ).not.toBeInTheDocument();
    expect(localStorage.getItem('searchTerm')).toBe(mockData.results[10].name);
  });
});
