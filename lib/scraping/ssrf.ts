import { lookup } from 'node:dns/promises';
import ipaddr from 'ipaddr.js';
import { getAllowedGrantDomains } from '../env';

const blockedHostnames = new Set(['localhost', 'metadata.google.internal']);
const metadataIps = new Set(['169.254.169.254', '100.100.100.200']);

export function redactUrlForLog(rawUrl: string): string {
  const url = new URL(rawUrl);
  url.username = '';
  url.password = '';
  url.search = '';
  url.hash = '';
  return url.toString();
}

export function parseHttpUrl(rawUrl: string): URL {
  const url = new URL(rawUrl);
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new Error('Only HTTP and HTTPS URLs are supported.');
  }

  if (url.username || url.password) {
    throw new Error('URLs with embedded credentials are not supported.');
  }

  return url;
}

export function isBlockedHostname(hostname: string): boolean {
  const normalized = hostname.toLowerCase().replace(/\.$/, '');
  return blockedHostnames.has(normalized) || normalized.endsWith('.localhost');
}

export function isBlockedIp(address: string): boolean {
  if (metadataIps.has(address)) {
    return true;
  }

  if (!ipaddr.isValid(address)) {
    return false;
  }

  const parsed = ipaddr.parse(address);
  const range = parsed.range();
  return [
    'unspecified',
    'broadcast',
    'multicast',
    'linkLocal',
    'loopback',
    'private',
    'uniqueLocal',
    'carrierGradeNat',
  ].includes(range);
}

export function isAllowedByDomainAllowlist(
  hostname: string,
  allowlist = getAllowedGrantDomains(),
): boolean {
  if (allowlist.length === 0) {
    return true;
  }

  const normalized = hostname.toLowerCase();
  return allowlist.some((domain) => normalized === domain || normalized.endsWith(`.${domain}`));
}

export async function validateFetchTarget(rawUrl: string): Promise<URL> {
  const url = parseHttpUrl(rawUrl);

  if (isBlockedHostname(url.hostname)) {
    throw new Error('The requested host is blocked.');
  }

  if (!isAllowedByDomainAllowlist(url.hostname)) {
    throw new Error('The requested domain is not in the configured allowlist.');
  }

  const addresses = await lookup(url.hostname, { all: true, verbatim: false });
  if (addresses.length === 0) {
    throw new Error('The requested host could not be resolved.');
  }

  for (const address of addresses) {
    if (isBlockedIp(address.address)) {
      throw new Error('The requested host resolves to a blocked network.');
    }
  }

  return url;
}
