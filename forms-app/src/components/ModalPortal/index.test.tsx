import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ModalPortal from './index';


describe('ModalPortal', () => {
  it('renders content into the portal when open', () => {
    render(
      <ModalPortal open={true} onClose={() => {}} labelledBy="test">
        <div>modal content</div>
      </ModalPortal>,
    );

    expect(screen.getByText(/modal content/i)).toBeDefined();
  });
});
