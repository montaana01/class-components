import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import ModalPortal from './index';

describe('ModalPortal', () => {
  const onClose = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('calls onClose on ESC press', async () => {
    render(<ModalPortal open={true} onClose={onClose} labelledBy="lbl"><div>c</div></ModalPortal>);

    await userEvent.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when clicking outside (backdrop) but not when clicking inside', () => {
    render(<ModalPortal open={true} onClose={onClose} labelledBy="lbl">
      <button>inside</button>
    </ModalPortal>);

    const backdrop = document.body.querySelector('.modal-backdrop') as HTMLElement;
    const modal = document.body.querySelector('.modal') as HTMLElement;
    expect(backdrop).toBeTruthy();
    expect(modal).toBeTruthy();

    fireEvent.mouseDown(modal);
    expect(onClose).not.toHaveBeenCalled();

    fireEvent.mouseDown(backdrop);
    expect(onClose).toHaveBeenCalled();
  });
});
