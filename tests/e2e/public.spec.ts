import { expect, test } from '@playwright/test';

test('homepage renders public mission and calls to action', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Give-A-Wonderful-Day' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Nominate someone' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Donate' }).nth(1)).toBeVisible();
});

test('admin routes are not publicly accessible', async ({ page }) => {
  await page.goto('/admin');
  await expect(page).toHaveURL(/\/signin/);
});

test('automation API denies unauthenticated access', async ({ request }) => {
  const response = await request.post('/api/scrape', {
    data: { url: 'https://example.org/grants' },
  });
  expect(response.status()).toBe(401);
});

test('mock payment webhook is disabled publicly', async ({ request }) => {
  const response = await request.post('/api/payments/webhook', {
    data: { id: 'evt_test' },
  });
  expect(response.status()).toBe(503);
});

test('nomination form validates required content', async ({ page }) => {
  await page.goto('/nominate');
  await page.getByRole('button', { name: 'Submit nomination' }).click();
  await expect(page.getByLabel('Nominee name')).toBeFocused();
});
