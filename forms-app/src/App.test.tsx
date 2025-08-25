import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, beforeEach, expect } from 'vitest';
import App from '@/App';
import { useFormStore } from '@/store/useFormStore';

describe('App component', () => {
  beforeEach(() => {
    useFormStore.setState({
      entries: [
        {
          id: 'entry-1',
          source: 'uncontrolled',
          name: 'Tester',
          age: 33,
          email: 't@example.com',
          gender: 'male',
          country: 'US',
          acceptTos: true,
          pictureBase64: 'data:image/png;base64,AAA',
          createdAt: Date.now(),
        },
      ],
      countries: ['US'],
    });
  });

  it('renders entries and opens/closes modals via header buttons', async () => {
    render(<App />);

    expect(screen.getByText(/Tester/)).toBeInTheDocument();
    const img = screen.getByAltText(/pic/i) as HTMLImageElement;
    expect(img).toHaveAttribute('src', 'data:image/png;base64,AAA');

    const openUc = screen.getByRole('button', { name: /Open Uncontrolled Form/i });
    await userEvent.click(openUc);

    const modalHeading = await screen.findByRole('heading', { name: /Uncontrolled/i });
    expect(modalHeading).toBeInTheDocument();

    const closeBtn = screen.getByRole('button', { name: 'X' });
    await userEvent.click(closeBtn);

    const openHf = screen.getByRole('button', { name: /Open React Hook Form/i });
    await userEvent.click(openHf);

    const hfHeading = await screen.findByRole('heading', { name: /Hook Form/i });
    expect(hfHeading).toBeInTheDocument();
  });
});
