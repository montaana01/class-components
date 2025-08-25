import { describe, it, expect } from 'vitest';
import { passwordStrengthScore, passwordStrengthLabel } from './index';

describe('password strength helpers', () => {
  it('calculates score correctly and maps to labels', () => {
    expect(passwordStrengthScore('abc')).toBeGreaterThanOrEqual(1);
    expect(passwordStrengthScore('Abcdef1!')).toBe(4);
    expect(passwordStrengthLabel(0)).toBe('Bad password');
    expect(passwordStrengthLabel(1)).toBe('Bad password');
    expect(passwordStrengthLabel(2)).toBe('Good password');
    expect(passwordStrengthLabel(3)).toBe('Great password');
    expect(passwordStrengthLabel(4)).toBe('Strong password');
  });
});
