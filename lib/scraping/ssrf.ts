// lib/scraping/ssrf.ts

/**
 * Validates a URL to ensure it's safe to fetch (SSRF protection)
 */
export async function validateFetchTarget(url: string): Promise<URL> {
  const parsedUrl = new URL(url);
  
  // Prevent fetching from private IP ranges and localhost
  const hostname = parsedUrl.hostname;
  
  if (
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname.startsWith('192.168.') ||
    hostname.startsWith('10.') ||
    hostname.startsWith('172.') ||
    hostname === '[::1]'
  ) {
    throw new Error('Cannot fetch from private IP address');
  }
  
  // Only allow http and https
  if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
    throw new Error('Only http and https protocols are allowed');
  }
  
  return parsedUrl;
}

/**
 * Redacts sensitive information from URLs for logging
 */
export function redactUrlForLog(url: string): string {
  try {
    const parsed = new URL(url);
    // Remove password if present
    if (parsed.password) {
      parsed.password = '***';
    }
    return parsed.toString();
  } catch {
    return '[invalid-url]';
  }
}