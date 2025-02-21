import { test, expect } from '@playwright/test'
import { ai } from '@zerostep/playwright'

test.describe('New York Times', () => {
  test.beforeEach(async ({ page }) => {
    // Set the viewport size to match the screen resolution
    await page.setViewportSize({ width: 1920, height: 1080 });
  });
  
  test('go to section and verify ad is displayed', async ({ page }) => {
    await page.goto('https://www.nytimes.com')
    await ai(`Accept all privacy preferences if they show up`, { page, test })
    await ai(`Accept the terms if they show up`, { page, test })
    await ai(`Click Continue if you see the 'We've updated the terms'`, { page, test })
    await ai(`Hover over the World top nav item`, { page, test })
    await ai('Click the "World" section', { page, test })
    const cta = await ai('What is the CTA of the ad at the top of the page?', { page, test })

    console.log('Call to action is: ', cta)
    // Take a screenshot after verifying the search bar
    await page.screenshot({ path: 'screenshots/after-verify-search-bar.png' });
  })
})