import { describe, it, expect, beforeEach } from 'vitest';
import { useSelectedItemsStore } from './selectedItemsStore';
import type { CharacterDetail } from '../types';
import { mockData } from '../test-utils/mock-constants.ts';

const mockCharacter1: CharacterDetail = mockData.results[0];
const mockCharacter2: CharacterDetail = mockData.results[1];

describe('useSelectedItemsStore', () => {
  beforeEach(() => {
    const initialState = useSelectedItemsStore.getState();
    initialState.clearAll();
  });

  it('have empty initial state', () => {
    const state = useSelectedItemsStore.getState();
    expect(state.selectedItems).toEqual([]);
  });

  describe('toggleItem', () => {
    it('add item to store', () => {
      useSelectedItemsStore.getState().toggleItem(mockCharacter1);
      const state = useSelectedItemsStore.getState();

      expect(state.selectedItems).toHaveLength(1);
      expect(state.selectedItems[0]).toEqual(mockCharacter1);
    });

    it("don't add duplicates", () => {
      useSelectedItemsStore.getState().toggleItem(mockCharacter1);
      useSelectedItemsStore.getState().toggleItem(mockCharacter1);
      useSelectedItemsStore.getState().toggleItem(mockCharacter1);

      const state = useSelectedItemsStore.getState();
      expect(state.selectedItems).toHaveLength(1);
    });

    it('save order while adding elements', () => {
      useSelectedItemsStore.getState().toggleItem(mockCharacter1);
      useSelectedItemsStore.getState().toggleItem(mockCharacter2);

      const state = useSelectedItemsStore.getState();
      expect(state.selectedItems[0]).toEqual(mockCharacter1);
      expect(state.selectedItems[1]).toEqual(mockCharacter2);
    });
  });

  describe('removeItem', () => {
    beforeEach(() => {
      useSelectedItemsStore.setState({
        selectedItems: [mockCharacter1, mockCharacter2],
      });
    });

    it('delete item by ID', () => {
      useSelectedItemsStore.getState().removeItem(mockCharacter1.id);

      const state = useSelectedItemsStore.getState();
      expect(state.selectedItems).toHaveLength(1);
      expect(state.selectedItems[0]).toEqual(mockCharacter2);
    });

    it("don't remove item if no exist", () => {
      useSelectedItemsStore.getState().removeItem(999); // Несуществующий ID

      const state = useSelectedItemsStore.getState();
      expect(state.selectedItems).toHaveLength(2);
    });
  });

  it('clear all elements', () => {
    useSelectedItemsStore.setState({
      selectedItems: [mockCharacter1, mockCharacter2],
    });
    useSelectedItemsStore.getState().clearAll();
    const state = useSelectedItemsStore.getState();
    expect(state.selectedItems).toEqual([]);
  });
});
