import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  use: {
    baseURL: 'http://127.0.0.1:3000',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: {
      AUTH_SECRET: 'playwright-development-secret-32-chars',
      AUTH_URL: 'http://127.0.0.1:3000',
      NEXTAUTH_URL: 'http://127.0.0.1:3000',
      ENABLE_ADMIN_AUTOMATION: 'false',
      NEXT_PUBLIC_EXPECTED_CHAIN_ID: '11155111',
      NEXT_PUBLIC_BLOCK_EXPLORER_URL: 'https://sepolia.etherscan.io',
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
