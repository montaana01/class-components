import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import MainPage from './index';

vi.mock('../../Navigation', () => ({
  default: () => <nav>NavigationMock</nav>,
}));
describe('MainPage', () => {
  it('renders header, Navigation, Outlet, and ErrorButton', () => {
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { name: /rick&morty react app/i })
    ).toBeInTheDocument();
    expect(screen.getByText('NavigationMock')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /set error/i })
    ).toBeInTheDocument();
  });
});
