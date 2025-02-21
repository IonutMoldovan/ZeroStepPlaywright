import { test, expect } from '@playwright/test';
import { ai } from '@zerostep/playwright';

test.describe('Wikipedia', () => {
  test.beforeEach(async ({ page }) => {
    // Set the viewport size to match the screen resolution
    await page.setViewportSize({ width: 1920, height: 1080 });
  });
  
  test('view article history and verify earliest revision', async ({ page }) => {
    await page.goto('https://en.wikipedia.org/wiki/Software_testing');

    // Alternatively: await ai('Click View History', { page, test })
    await page.locator('#right-navigation #p-views').getByText('View History').click();
    await ai('Sort by "oldest" and wait for page refresh', { page, test });
    
    // Get the date of the first revision listed on this page
    const dateString = await ai('get the date of the first revision listed on this page', { page, test });

    // Log the date string for debugging
    console.log('Date String:', dateString);

    // Parse the date string into a Date object
    const date = new Date(dateString);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      throw new Error(`Invalid date: ${dateString}`);
    }

    // Verify that the year is 2004
    expect(date.getFullYear()).toBe(2004);
  });
});