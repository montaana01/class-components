import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('renders the main heading and includes SearchContainer and ErrorButton at App', () => {
    render(<App />);
    expect(screen.getByText(/rick&morty react app/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/type to search.../i)
    ).toBeInTheDocument();
    expect(screen.getByText(/set error/i)).toBeInTheDocument();
  });
});
