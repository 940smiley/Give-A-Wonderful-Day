export function transactionExplorerUrl(baseUrl: string, hash: string): string {
  return `${baseUrl.replace(/\/$/, '')}/tx/${hash}`;
}
