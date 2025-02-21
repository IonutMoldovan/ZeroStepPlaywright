import { test, expect } from '@playwright/test'
import { ai } from '@zerostep/playwright'

test.describe('Yahoo Finance', () => {
  test('verify the presence of the search bar', async ({ page }) => {
    await page.goto('https://finance.yahoo.com');

    // Use AI to verify that the search bar is present on the page
    await ai('Verify that the search bar is present on the page', { page, test });

    // Take a screenshot after verifying the search bar
    await page.screenshot({ path: 'screenshots/after-verify-search-bar.png' });
  });
});