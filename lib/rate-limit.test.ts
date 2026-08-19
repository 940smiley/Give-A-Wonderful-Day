import { describe, expect, it } from 'vitest';
import { checkRateLimit } from './rate-limit';

describe('checkRateLimit', () => {
  it('blocks requests after the configured limit', () => {
    const key = `unit:${Date.now()}`;
    expect(checkRateLimit(key, { limit: 2, windowMs: 60_000 }).allowed).toBe(true);
    expect(checkRateLimit(key, { limit: 2, windowMs: 60_000 }).allowed).toBe(true);
    expect(checkRateLimit(key, { limit: 2, windowMs: 60_000 }).allowed).toBe(false);
  });
});
