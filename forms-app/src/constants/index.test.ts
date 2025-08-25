import { describe, it, expect } from 'vitest';
import { countries } from './index';

describe('constants/countries', () => {
  it('exports an array of countries', () => {
    expect(Array.isArray(countries)).toBe(true);
    expect(countries.length).toBeGreaterThan(0);
  });
});
