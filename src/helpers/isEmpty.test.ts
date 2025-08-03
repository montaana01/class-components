import { describe, it, expect } from 'vitest';
import isEmptyArray from './isEmpty';

describe('isEmptyArray', () => {
  it('returns true for an empty array', () => {
    expect(isEmptyArray([])).toBe(true);
  });

  it('returns false for a non-empty array', () => {
    expect(isEmptyArray([1, 2, 3])).toBe(false);
  });

  it('returns true if input is not an array (e.g. null)', () => {
    expect(isEmptyArray(null as unknown as never[])).toBe(true);
  });

  it('returns true if input is not an array (e.g. undefined)', () => {
    expect(isEmptyArray(undefined as unknown as never[])).toBe(true);
  });

  it('returns true if input is not an array (e.g. number)', () => {
    expect(isEmptyArray(123 as unknown as never[])).toBe(true);
  });

  it('returns true if input is not an array (e.g. string)', () => {
    expect(isEmptyArray('hello' as unknown as never[])).toBe(true);
  });

  it('returns true if input is not an array (e.g. object)', () => {
    expect(isEmptyArray({} as unknown as never[])).toBe(true);
  });
});
