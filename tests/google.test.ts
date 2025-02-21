import { test, expect } from '@playwright/test'
import { ai } from '@zerostep/playwright'

test.describe('Google', () => {
  const searchTerm = 'software testing'

  test.beforeEach(async ({ page }) => {
    // Set the viewport size to match the screen resolution
    await page.setViewportSize({ width: 1920, height: 1080 });
  });
  
  test('search and verify the first organic search result', async ({ page }) => {
    await page.goto('https://www.google.com')
    await ai(`if this popup does show up 'Inainte de a accesa google' then click 'Accept All' `, { page, test })
    await ai(`Search for '${searchTerm}'`, { page, test })
    await page.keyboard.press('Enter')

    await page.waitForURL('https://www.google.com/search**')

    const title = await ai(`What is the title of the first organic search result?`, { page, test })

    console.log('First organic search result is: ', title)
    // Take a screenshot after verifying the search bar
    await page.screenshot({ path: 'screenshots/google-after-verify-search-bar.png' });
    test.info().attach('Final Screenshot', { path: 'screenshots/google-after-verify-search-bar.png', contentType: 'image/png' });
  })
})