// import '@testing-library/jest-dom';
// import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
// import { render, screen, fireEvent } from '@testing-library/react';
// import { FlyOut } from './index';
// import { useSelectedItemsStore } from '../../store/selectedItemsStore.ts';
// import type { CharacterDetail, SelectedItemsState } from '../../types';
// import { mockData } from '../../test-utils/mock-constants.ts';
//
// vi.mock('../../store/selectedItemsStore.ts', () => ({
//   useSelectedItemsStore: vi.fn(),
// }));
// const createObjectURLMock = vi.fn();
// const revokeObjectURLMock = vi.fn();
//
// const mockItems = mockData.results;
//
// describe('FlyOut Component', () => {
//   beforeEach(() => {
//     vi.resetAllMocks();
//     global.URL.createObjectURL = createObjectURLMock;
//     global.URL.revokeObjectURL = revokeObjectURLMock;
//   });
//
//   const mockToggleItem = vi.fn();
//   const mockRemoveItem = vi.fn();
//   const mockClearAll = vi.fn();
//
//   const mockStoreState = (selectedItems: CharacterDetail[] = []) => {
//     (useSelectedItemsStore as unknown as Mock).mockImplementation(
//       (selector?: (state: SelectedItemsState) => SelectedItemsState) => {
//         const state = {
//           selectedItems,
//           toggleItem: mockToggleItem,
//           removeItem: mockRemoveItem,
//           clearAll: mockClearAll,
//         };
//         return selector ? selector(state) : state;
//       }
//     );
//   };
//
//   it("if no selected elements buttons doesn't exist or unactive", () => {
//     mockStoreState([]);
//     render(<FlyOut />);
//
//     expect(screen.queryByText('Unselect all')?.hasAttribute('active')).toBe(
//       false
//     );
//     expect(screen.queryByText('Download')).not.toBeInTheDocument();
//   });
//
//   it('if have selections => show buttons', () => {
//     mockStoreState(mockItems);
//     render(<FlyOut />);
//
//     expect(screen.getByText('Unselect all')).toBeInTheDocument();
//     expect(screen.getByText('Download')).toBeInTheDocument();
//   });
//
//   it('while clicking unselect button => call clear method', () => {
//     mockStoreState(mockItems);
//     render(<FlyOut />);
//
//     fireEvent.click(screen.getByText('Unselect all'));
//     expect(mockClearAll).toHaveBeenCalled();
//   });
// });
