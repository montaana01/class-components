import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchButton from './index';

describe('SearchButton', () => {
  it('should render button with the text "Search"', () => {
    const mockClick = vi.fn();
    render(<SearchButton onClick={mockClick} />);

    const buttonElement = screen.getByRole('button', { name: /search/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('Search');
  });

  it('should call onClick handler when clicked', async () => {
    const mockClick = vi.fn();
    render(<SearchButton onClick={mockClick} />);

    const buttonElement = screen.getByRole('button', { name: /search/i });
    const user = userEvent.setup();
    await user.click(buttonElement);

    expect(mockClick).toHaveBeenCalledTimes(1);
  });
});
