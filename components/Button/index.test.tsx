// import '@testing-library/jest-dom';
// import { describe, it, expect, vi } from 'vitest';
// import { render, screen, fireEvent } from '@testing-library/react';
// import Button from './index';
// import type { ButtonOptions } from '../../types';
//
// describe('Button component', () => {
//   const defaultProps: ButtonOptions = {
//     title: 'Close',
//     onClick: vi.fn(),
//     disabled: false,
//   };
//
//   it('renders with the provided title', () => {
//     render(<Button {...defaultProps} />);
//     const btn = screen.getByRole('button', { name: /close/i });
//     expect(btn).toBeInTheDocument();
//   });
//
//   it('has the "detail-close" class', () => {
//     render(<Button {...defaultProps} />);
//     const btn = screen.getByRole('button');
//     expect(btn).toHaveClass('detail-close');
//   });
//
//   it('is enabled when disabled prop is false', () => {
//     render(<Button {...defaultProps} disabled={false} />);
//     const btn = screen.getByRole('button');
//     expect(btn).not.toBeDisabled();
//   });
//
//   it('is disabled when disabled prop is true', () => {
//     render(<Button {...defaultProps} disabled={true} />);
//     const btn = screen.getByRole('button');
//     expect(btn).toBeDisabled();
//   });
//
//   it('calls onClick handler when clicked (enabled)', () => {
//     const onClick = vi.fn();
//     render(<Button {...defaultProps} onClick={onClick} disabled={false} />);
//     const btn = screen.getByRole('button');
//     fireEvent.click(btn);
//     expect(onClick).toHaveBeenCalledTimes(1);
//   });
//
//   it('does not call onClick when clicked (disabled)', () => {
//     const onClick = vi.fn();
//     render(<Button {...defaultProps} onClick={onClick} disabled={true} />);
//     const btn = screen.getByRole('button');
//     fireEvent.click(btn);
//     expect(onClick).not.toHaveBeenCalled();
//   });
// });
