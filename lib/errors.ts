export function getErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message.trim().length > 0) {
    return error.message;
  }

  if (typeof error === 'string' && error.trim().length > 0) {
    return error;
  }

  return 'An unknown error occurred.';
}

export function isUserRejectedRequest(error: unknown): boolean {
  if (typeof error !== 'object' || error === null) {
    return false;
  }

  const candidate = error as { code?: unknown; info?: { error?: { code?: unknown } } };
  return candidate.code === 4001 || candidate.info?.error?.code === 4001;
}

export function normalizeOperationalError(error: unknown, fallback: string): string {
  if (isUserRejectedRequest(error)) {
    return 'The request was rejected in the wallet.';
  }

  return getErrorMessage(error) || fallback;
}
