import { describe, it, expect } from 'vitest';
import { submitSchema } from './index';

describe('submitSchema (zod) validations', () => {
  it('accepts valid payload with strong password', () => {
    const payload = {
      name: 'John',
      age: 30,
      email: 'john@example.com',
      password: 'Abcdef1!',
      confirmPassword: 'Abcdef1!',
      gender: 'male',
      acceptTos: true,
      country: 'US',
    };

    const res = submitSchema.safeParse(payload);
    expect(res.success).toBe(true);
  });

  it('rejects when passwords mismatch', () => {
    const payload = {
      name: 'John',
      age: 30,
      email: 'john@example.com',
      password: 'Abcdef1!',
      confirmPassword: 'Other1!',
      gender: 'male',
      acceptTos: true,
      country: 'US',
    };

    const res = submitSchema.safeParse(payload);
    expect(res.success).toBe(false);
    if (!res.success) {
      const issues = res.error.issues.map((i) => i.message);
      expect(issues).toContain('Passwords must match');
    }
  });

  it('rejects weak password (score < 4)', () => {
    const payload = {
      name: 'John',
      age: 30,
      email: 'john@example.com',
      password: 'abcdefg1',
      confirmPassword: 'abcdefg1',
      gender: 'male',
      acceptTos: true,
      country: 'US',
    };

    const res = submitSchema.safeParse(payload);
    expect(res.success).toBe(false);
  });
});
