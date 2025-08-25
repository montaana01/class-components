import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import UncontrolledForm from './index';
import * as formStore from '@/store/useFormStore';

describe('UncontrolledForm', () => {
  const onClose = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
    formStore.useFormStore.setState({ entries: [], countries: [] });
  });

  it('renders all required fields', () => {
    render(<UncontrolledForm onClose={onClose} />);

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Gender/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Country/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Picture/i)).toBeInTheDocument();
  });

  it('shows validation errors when submitting empty form and focuses first invalid', async () => {
    render(<UncontrolledForm onClose={onClose} />);

    userEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      const errs = document.querySelectorAll('.error-text');
      expect(errs.length).toBeGreaterThan(0);
    });

    const first = document.getElementById('uc-name');
    expect(document.activeElement === first).toBe(true);
  });

  it('clears specific error when user changes the field', async () => {
    render(<UncontrolledForm onClose={onClose} />);

    userEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(document.querySelector('.error-text')).toBeTruthy();
    });

    const nameInput = screen.getByLabelText(/Name/i);
    await userEvent.type(nameInput, 'John');

    expect(screen.queryByText(/Required/i)).not.toBeInTheDocument();
  });
});
