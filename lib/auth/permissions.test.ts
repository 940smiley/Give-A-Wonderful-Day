import { describe, expect, it } from 'vitest';
import { hasPermission } from './permissions';

describe('hasPermission', () => {
  it('grants least privilege by role', () => {
    expect(hasPermission('SUPER_ADMIN', 'automation:run')).toBe(true);
    expect(hasPermission('CASE_MANAGER', 'nomination:review')).toBe(true);
    expect(hasPermission('VOLUNTEER', 'automation:run')).toBe(false);
  });
});
