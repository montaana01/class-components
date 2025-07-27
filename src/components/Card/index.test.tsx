import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from './index';

describe('Card Component', () => {
  const baseUrl = 'https://example.com';
  it('renders an anchor with the correct href and name inside component', () => {
    render(<Card name="Example" url={baseUrl} />);
    const linkElement = screen.getByRole('link');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', baseUrl);
    expect(linkElement).toHaveTextContent('Example');
  });

  it('does not render anchor when url is missing', () => {
    render(<Card name="NoLink" url="" />);
    const linkElement = screen.queryByRole('link');
    expect(linkElement).not.toBeInTheDocument();
  });

  it('handles empty name gracefully', () => {
    render(<Card name="" url={baseUrl} />);
    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveTextContent('');
  });
});
