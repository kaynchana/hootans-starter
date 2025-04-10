import { expect, test } from '@playwright/test';

test('homepage has title and links', async ({ page }) => {
  // Navigate to the homepage
  await page.goto('/');

  // Expect the page to have a title
  await expect(page).toHaveTitle(/Hootans/);
});
