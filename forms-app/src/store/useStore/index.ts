import { create } from 'zustand/react';
import type { State } from '@/types';

export const useStore = create<State>((set) => ({
  entries: [],
  countries: [],
  addEntry: (entry) =>
    set((state) => ({
      entries: [{ ...entry, id: crypto.randomUUID(), createdAt: Date.now() }, ...state.entries],
    })),
  setCountries: (countries) => set({ countries: countries }),
}));
