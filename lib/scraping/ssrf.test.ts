import { describe, expect, it } from 'vitest';
import { isAllowedByDomainAllowlist, isBlockedHostname, isBlockedIp, parseHttpUrl } from './ssrf';

describe('SSRF protections', () => {
  it('blocks non-http protocols', () => {
    expect(() => parseHttpUrl('file:///etc/passwd')).toThrow('Only HTTP and HTTPS URLs');
    expect(() => parseHttpUrl('data:text/plain,hello')).toThrow('Only HTTP and HTTPS URLs');
  });

  it('blocks local and private network destinations', () => {
    expect(isBlockedHostname('localhost')).toBe(true);
    expect(isBlockedIp('127.0.0.1')).toBe(true);
    expect(isBlockedIp('10.0.0.5')).toBe(true);
    expect(isBlockedIp('172.16.0.1')).toBe(true);
    expect(isBlockedIp('192.168.1.10')).toBe(true);
    expect(isBlockedIp('169.254.169.254')).toBe(true);
    expect(isBlockedIp('::1')).toBe(true);
  });

  it('supports a domain allowlist', () => {
    expect(isAllowedByDomainAllowlist('grants.example.org', ['example.org'])).toBe(true);
    expect(isAllowedByDomainAllowlist('evil.test', ['example.org'])).toBe(false);
  });
});
