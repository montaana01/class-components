import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import HookForm from './index';
import * as formStore from '@/store/useFormStore';

describe('react-hook-form', () => {
  const onClose = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
    formStore.useFormStore.setState({ entries: [], countries: [] });
  });

  it('renders all required fields and password strength label updates', async () => {
    render(<HookForm onClose={onClose} />);

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Gender/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Country/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Picture/i)).toBeInTheDocument();

    const pw = screen.getByLabelText(/^Password$/i);
    await userEvent.type(pw, 'Abcdef1!');
    expect(screen.getByText(/Password strength:/i)).toBeInTheDocument();
  });

  it('shows validation errors for invalid data and prevents submit', async () => {
    render(<HookForm onClose={onClose} />);

    await userEvent.type(screen.getByLabelText(/Email/i), 'bad-email');
    await userEvent.type(screen.getByLabelText(/^Password$/i), 'weakpw1'); // short/weak
    await userEvent.type(screen.getByLabelText(/Confirm/i), 'other');

    await userEvent.click(screen.getByRole('button', { name: /submit/i }));
    await waitFor(() => {
      const errors = document.querySelectorAll('.error');
      expect(errors.length).toBeGreaterThanOrEqual(1);
    });
    expect(onClose).not.toHaveBeenCalled();
  });
});

