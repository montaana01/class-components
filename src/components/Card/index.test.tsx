import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from './index';

describe('Card Component', () => {
  it('renders an anchor with the correct href and name inside component', () => {
    render(<Card name="Example" url="https://example.com" />);
    const linkElement = screen.getByRole('link');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', 'https://example.com');
    expect(linkElement).toHaveTextContent('Example');
  });

  it('does not render anchor when url is missing', () => {
    render(<Card name="NoLink" url="" />);
    const linkElement = screen.queryByRole('link');
    expect(linkElement).not.toBeInTheDocument();
  });

  it('handles empty name gracefully', () => {
    render(<Card name="" url="https://example.com" />);
    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveTextContent('');
  });
});
