type Bucket = {
  count: number;
  resetAt: number;
};

type RateLimitOptions = {
  limit: number;
  windowMs: number;
};

const buckets = new Map<string, Bucket>();

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0]?.trim() || 'unknown';
  }

  return request.headers.get('x-real-ip') || 'unknown';
}

export function checkRateLimit(
  key: string,
  options: RateLimitOptions,
): {
  allowed: boolean;
  remaining: number;
  resetAt: number;
} {
  const now = Date.now();
  const current = buckets.get(key);

  if (!current || current.resetAt <= now) {
    const next = { count: 1, resetAt: now + options.windowMs };
    buckets.set(key, next);
    return { allowed: true, remaining: options.limit - 1, resetAt: next.resetAt };
  }

  current.count += 1;
  buckets.set(key, current);

  return {
    allowed: current.count <= options.limit,
    remaining: Math.max(0, options.limit - current.count),
    resetAt: current.resetAt,
  };
}

export function rateLimitKey(request: Request, scope: string): string {
  return `${scope}:${getClientIp(request)}`;
}
