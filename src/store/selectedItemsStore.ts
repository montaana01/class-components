import { create } from 'zustand';
import type { CharacterDetail, SelectedItemsState } from '../types';

export const useSelectedItemsStore = create<SelectedItemsState>((set) => ({
  selectedItems: [],
  toggleItem: (item: CharacterDetail) =>
    set((state: SelectedItemsState) => {
      const exists = state.selectedItems.some(
        (selectedItem) => selectedItem.id === item.id
      );
      if (exists) {
        return {
          selectedItems: state.selectedItems.filter(
            (selectedItem) => selectedItem.id !== item.id
          ),
        };
      }
      return { selectedItems: [...state.selectedItems, item] };
    }),
  removeItem: (id) =>
    set((state) => ({
      selectedItems: state.selectedItems.filter(
        (selectedItem) => selectedItem.id !== id
      ),
    })),
  clearAll: () => set({ selectedItems: [] }),
}));
