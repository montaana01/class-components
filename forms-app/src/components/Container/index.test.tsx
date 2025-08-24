import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Container } from './index';


describe('Container', () => {
  it('renders children', () => {
    render(<Container>hello container</Container>);
    expect(screen.getByText(/hello container/i)).toBeDefined();
  });
});
