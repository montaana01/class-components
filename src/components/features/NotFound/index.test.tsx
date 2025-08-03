import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFound from './index';

describe('NotFound', () => {
  it('renders "Page Not Found" heading and a link to go back', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { name: /page not found/i })
    ).toBeInTheDocument();
    const link = screen.getByRole('link', { name: /go back/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });
});
