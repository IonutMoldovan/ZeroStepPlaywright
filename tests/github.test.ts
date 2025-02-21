import { test, expect } from '@playwright/test'
import { ai } from '@zerostep/playwright'

test.describe('GitHub', () => {
  test('verify the number of labels in a repo', async ({ page }) => {
    await page.goto('https://github.com/zerostep-ai/zerostep')

    await ai(`Click on the Issues tabs`, { page, test })
    await page.waitForURL('https://github.com/zerostep-ai/zerostep/issues')

    // Take a screenshot after verifying the search bar
    await page.screenshot({ path: 'screenshots/after-verify-search-bar.png' });
  })
})