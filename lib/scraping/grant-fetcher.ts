import { validateFetchTarget, redactUrlForLog } from './ssrf';
import { JSDOM } from 'jsdom';

const allowedContentTypes = ['text/html', 'text/plain', 'application/xhtml+xml'];

export type GrantPageResult = {
  url: string;
  finalUrl: string;
  title?: string;
  text: string;
  contentType: string;
};

function sanitizeHtmlToText(html: string): { title?: string; text: string } {
  // Prefer a DOM parser so entities are decoded and text ordering is preserved.
  try {
    const dom = new JSDOM(html);
    const { document } = dom.window;

    // Remove nodes that shouldn't contribute to visible text
    document.querySelectorAll('script, style, noscript').forEach((n) => n.remove());

    const rawTitle = document.querySelector('title')?.textContent ?? undefined;
    const title = rawTitle?.replace(/\s+/g, ' ').trim();

    const bodyText = document.body?.textContent ?? '';
    const text = bodyText.replace(/\s+/g, ' ').trim();

    return { title, text };
  } catch (e) {
    // Fallback to the older regex-based approach if DOM parsing fails for any reason.
    const title = html
      .match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]
      ?.replace(/\s+/g, ' ')
      .trim();
    const withoutUnsafe = html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ');
    const text = withoutUnsafe
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&amp;/g, '&')
      .replace(/\s+/g, ' ')
      .trim();

    return { title, text };
  }
}

async function readLimitedBody(response: Response, maxBytes: number): Promise<string> {
  const reader = response.body?.getReader();
  if (!reader) return '';

  const chunks: Uint8Array[] = [];
  let total = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) {
        total += value.byteLength;
        if (total > maxBytes) {
          // Cancel the reader to free the stream resources before throwing.
          try {
            await reader.cancel();
          } catch {}
          throw new Error('Response body is too large.');
        }
        // Make a copy of value because some Uint8Array views can be reused by the stream implementation
        chunks.push(new Uint8Array(value));
      }
    }

    // Concatenate into a single Uint8Array
    const result = new Uint8Array(total);
    let offset = 0;
    for (const chunk of chunks) {
      result.set(chunk, offset);
      offset += chunk.byteLength;
    }

    return new TextDecoder().decode(result);
  } finally {
    // Ensure the reader is cancelled/closed if possible
    try {
      await reader.cancel();
    } catch {}
  }
}

export async function fetchGrantPage(rawUrl: string): Promise<GrantPageResult> {
  let current = await validateFetchTarget(rawUrl);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12_000);

  const MAX_REDIRECTS = 3;

  try {
    for (let redirectCount = 0; redirectCount < MAX_REDIRECTS; redirectCount += 1) {
      const response = await fetch(current, {
        redirect: 'manual',
        signal: controller.signal,
        headers: {
          accept: allowedContentTypes.join(','),
          'user-agent': 'Give-A-Wonderful-Day-GrantFetcher/1.0 (+https://example.invalid/security)',
        },
      });

      if ([301, 302, 303, 307, 308].includes(response.status)) {
        const location = response.headers.get('location');
        if (!location) throw new Error('Redirect response did not include a location.');
        current = await validateFetchTarget(new URL(location, current).toString());
        continue;
      }

      if (!response.ok) {
        throw new Error(`Grant page retrieval failed with status ${response.status}.`);
      }

      const contentLength = response.headers.get('content-length');
      if (contentLength && Number(contentLength) > 1_000_000) {
        throw new Error('Response content is too large.');
      }

      const contentType = response.headers.get('content-type')?.split(';')[0]?.toLowerCase() ?? '';
      if (!allowedContentTypes.includes(contentType)) {
        throw new Error('Unsupported grant page content type.');
      }

      const body = await readLimitedBody(response, 1_000_000);
      const sanitizedResult = sanitizeHtmlToText(body);
      const sanitized = sanitizedResult.text.slice(0, 20_000);
      const title = sanitizedResult.title;

      return {
        url: redactUrlForLog(rawUrl),
        finalUrl: redactUrlForLog(current.toString()),
        title,
        text: sanitized,
        contentType,
      };
    }

    throw new Error('Too many redirects while retrieving grant page.');
  } finally {
    clearTimeout(timeout);
  }
}
