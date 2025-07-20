import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorButton } from './index';

describe('ErrorButton Component', () => {
  it('renders button with the text "Set Error"', () => {
    render(<ErrorButton />);
    expect(
      screen.getByRole('button', { name: /set error/i })
    ).toBeInTheDocument();
  });

  it('throws an error "Test error from ErrorButton" when button is clicked', async () => {
    render(<ErrorButton />);
    const button = screen.getByRole('button', { name: /set error/i });
    const user = userEvent.setup();
    await expect(user.click(button)).rejects.toThrow(
      /test error from errorbutton/i
    );
  });
});
