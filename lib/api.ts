import { NextResponse } from 'next/server';
import { getErrorMessage } from './errors';

export function jsonOk<T>(body: T, init?: ResponseInit): NextResponse<T> {
  return NextResponse.json(body, init);
}

export function jsonError(message: string, status = 400): NextResponse<{ error: string }> {
  return NextResponse.json({ error: message }, { status });
}

export function safeJsonError(error: unknown, status = 500): NextResponse<{ error: string }> {
  const message = status >= 500 ? 'The request could not be completed.' : getErrorMessage(error);
  return jsonError(message, status);
}

export async function readJsonBody<T>(
  request: Request,
  schema: { parse: (value: unknown) => T },
  maxBytes = 32_000,
): Promise<T> {
  const length = request.headers.get('content-length');
  if (length && Number(length) > maxBytes) {
    throw new Error('Request body is too large.');
  }

  const text = await request.text();
  if (new TextEncoder().encode(text).byteLength > maxBytes) {
    throw new Error('Request body is too large.');
  }

  return schema.parse(text ? JSON.parse(text) : {});
}
