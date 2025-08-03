import '@testing-library/jest-dom';
import { describe, beforeEach, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import SearchContainer from './index';
import { fetchApi } from '../../api/apiDriver';
import { mockData } from '../../test-utils/mock-constants';

vi.mock('../../api/apiDriver', () => ({
  fetchApi: vi.fn(),
}));

describe('SearchContainer', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.resetAllMocks();
    vi.mocked(fetchApi).mockResolvedValue(mockData);
  });

  it('initial load with no saved query should fetch data and display results', async () => {
    const fetchApiMock = vi.mocked(fetchApi);
    fetchApiMock.mockResolvedValue(mockData);

    render(
      <MemoryRouter initialEntries={['/search?page=1']}>
        <Routes>
          <Route path="/search" element={<SearchContainer />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(mockData.results[0].name)).toBeInTheDocument();
      expect(screen.getByText(mockData.results[10].name)).toBeInTheDocument();
    });
    expect(localStorage.getItem('searchTerm')).toBe('');
  });

  it('initial load with saved query should use it for filtering', async () => {
    const savedQuery = mockData.results[0].name;
    localStorage.setItem('searchTerm', savedQuery);
    const filteredData = {
      info: mockData.info,
      results: [{ ...mockData.results[0] }],
    };
    const fetchApiMock = vi.mocked(fetchApi);
    fetchApiMock.mockResolvedValue(filteredData);

    render(
      <MemoryRouter initialEntries={['/search?page=1']}>
        <Routes>
          <Route path="/search" element={<SearchContainer />} />
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText(savedQuery)).toBeInTheDocument();
    });

    expect(
      screen.queryByText(mockData.results[1].name)
    ).not.toBeInTheDocument();
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveValue(savedQuery);
  });

  it('updates input value and triggers search on button click', async () => {
    const fetchApiMock = vi.mocked(fetchApi);
    fetchApiMock.mockResolvedValue(mockData);

    render(
      <MemoryRouter initialEntries={['/search?page=1']}>
        <Routes>
          <Route path="/search" element={<SearchContainer />} />
        </Routes>
      </MemoryRouter>
    );
    const user = userEvent.setup();

    const input = screen.getByRole('textbox');
    await user.type(input, mockData.results[10].name);
    const searchButton = screen.getByRole('button', { name: /search/i });
    await user.click(searchButton);
    await waitFor(() => {
      expect(screen.getByText(mockData.results[10].name)).toBeInTheDocument();
    });

    expect(localStorage.getItem('searchTerm')).toBe(mockData.results[10].name);
  });
});
