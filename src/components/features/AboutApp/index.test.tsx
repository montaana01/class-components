import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AboutApp from './index';
import { MemoryRouter } from 'react-router';

describe('AboutApp component', () => {
  it('renders the main heading', () => {
    render(
      <MemoryRouter>
        <AboutApp />
      </MemoryRouter>
    );
    const heading = screen.getByRole('heading', { name: /about this app/i });
    expect(heading).toBeInTheDocument();
  });

  it('displays the author name', () => {
    render(
      <MemoryRouter>
        <AboutApp />
      </MemoryRouter>
    );
    const authorText = screen.getByText('Author: Alexey Yakovlev');
    expect(authorText).toBeInTheDocument();
  });

  it('renders the external RS School link with correct attributes', () => {
    render(
      <MemoryRouter>
        <AboutApp />
      </MemoryRouter>
    );
    const rsLink = screen.getByRole('link', { name: /rs school/i });
    expect(rsLink).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
    expect(rsLink).toHaveAttribute('target', '_blank');
    expect(rsLink).toHaveAttribute('rel', 'noreferrer');
  });

  it('renders the back-to-search NavLink pointing to root', () => {
    render(
      <MemoryRouter>
        <AboutApp />
      </MemoryRouter>
    );
    const backLink = screen.getByRole('link', { name: /← back to search/i });
    expect(backLink).toHaveAttribute('href', '/');
  });

  it('wraps everything in a container with the "about" class', () => {
    render(
      <MemoryRouter>
        <AboutApp />
      </MemoryRouter>
    );
    const container = screen.getByText(/about this app/i).closest('div');
    expect(container).toHaveClass('about');
  });
});
