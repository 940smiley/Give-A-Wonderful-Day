import { validateFetchTarget, redactUrlForLog } from './ssrf';

const allowedContentTypes = ['text/html', 'text/plain', 'application/xhtml+xml'];

export type GrantPageResult = {
  url: string;
  finalUrl: string;
  title?: string;
  text: string;
  contentType: string;
};

function unescapeHtmlEntities(text: string): string {
  return text.replace(/&(nbsp|amp|lt|gt|quot|#39);/gi, (match, entity: string) => {
    switch (entity.toLowerCase()) {
      case 'nbsp':
        return ' ';
      case 'lt':
        return '<';
      case 'gt':
        return '>';
      case 'quot':
        return '"';
      case '#39':
        return "'";
      case 'amp':
        return '&';
      default:
        return match;
    }
  });
}

function sanitizeHtmlToText(html: string): { title?: string; text: string } {
  const rawTitle = html.match(/<title\b[^>]*>([\s\S]*?)<\/title[^>]*>/i)?.[1];
  const title = rawTitle ? unescapeHtmlEntities(rawTitle).replace(/\s+/g, ' ').trim() : undefined;

  const withoutUnsafe = html
    .replace(/<script\b[\s\S]*?<\/script[^>]*>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style[^>]*>/gi, ' ')
    .replace(/<noscript\b[\s\S]*?<\/noscript[^>]*>/gi, ' ');

  const textWithoutTags = withoutUnsafe.replace(/<[^>]+>/g, ' ');
  const text = unescapeHtmlEntities(textWithoutTags).replace(/\s+/g, ' ').trim();

  return { title, text };
}

async function readLimitedBody(response: Response, maxBytes: number): Promise<string> {
  const reader = response.body?.getReader();
  if (!reader) {
    return '';
  }

  const chunks: Uint8Array[] = [];
  let total = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }

    if (value) {
      total += value.byteLength;
      if (total > maxBytes) {
        throw new Error('Response body is too large.');
      }
      chunks.push(value);
    }
  }

  return new TextDecoder().decode(Buffer.concat(chunks));
}

export async function fetchGrantPage(rawUrl: string): Promise<GrantPageResult> {
  let current = await validateFetchTarget(rawUrl);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12_000);

  try {
    for (let redirectCount = 0; redirectCount <= 3; redirectCount += 1) {
      const response = await fetch(current, {
        redirect: 'manual',
        signal: controller.signal,
        headers: {
          accept: 'text/html,text/plain,application/xhtml+xml',
          'user-agent': 'Give-A-Wonderful-Day-GrantFetcher/1.0 (+https://example.invalid/security)',
        },
      });

      if ([301, 302, 303, 307, 308].includes(response.status)) {
        const location = response.headers.get('location');
        if (!location) {
          throw new Error('Redirect response did not include a location.');
        }
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
      const sanitized = sanitizeHtmlToText(body).text.slice(0, 20_000);
      const title = sanitizeHtmlToText(body).title;

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
