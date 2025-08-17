// import '@testing-library/jest-dom';
// import { describe, it, expect, vi, beforeEach } from 'vitest';
// import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import SearchInput from './index';
//
// const handleChange = vi.fn();
// const handleEnter = vi.fn();
//
// describe('SearchInput', () => {
//   beforeEach(() => {
//     vi.clearAllMocks();
//   });
//
//   it('renders input with the given search query "Test" value', () => {
//     const query = 'Test';
//     render(
//       <SearchInput
//         searchQuery={query}
//         onChange={handleChange}
//         onEnter={handleEnter}
//       />
//     );
//     const input = screen.getByRole('textbox');
//     expect(input).not.toHaveValue('test');
//     expect(input).toHaveValue('Test');
//   });
//
//   it('calls onChange when text is input', async () => {
//     render(
//       <SearchInput
//         searchQuery=""
//         onChange={handleChange}
//         onEnter={handleEnter}
//       />
//     );
//     const input = screen.getByRole('textbox');
//     const user = userEvent.setup();
//     await user.type(input, 'a');
//     expect(handleChange).toHaveBeenCalledWith('a');
//     await user.type(input, 'b');
//     expect(handleChange).toHaveBeenCalledWith('b');
//   });
// });
