import { describe, it, expect} from "vitest";
import { useFormStore } from '@/store/useFormStore';

describe('useFormStore', () => {
  it('adds new entry', () => {
    const addEntry = useFormStore.getState().addEntry;
    addEntry({
      source: 'uncontrolled',
      name: 'Alice',
      age: 30,
      email: 'alice@example.com',
      gender: 'female',
      country: 'US',
      acceptTos: true,
      pictureBase64: null,
    });

    const state = useFormStore.getState();
    expect(state.entries.length).toBeGreaterThan(0);
    expect(state.entries[0].name).toBe('Alice');
  });
});
