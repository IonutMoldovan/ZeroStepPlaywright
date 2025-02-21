import { test, expect } from '@playwright/test';
import { ai } from '@zerostep/playwright';

test.describe('Calendly', () => {
  test.beforeEach(async ({ page }) => {
    // Set the viewport size to match the screen resolution
    await page.setViewportSize({ width: 1920, height: 1080 });
  });
  
  test('book the next available timeslot', async ({ page }) => {
    await test.step('Go to Calendly test page', async () => {
      await page.goto('https://calendly.com/zerostep-test/test-calendly');
      await page.screenshot({ path: 'screenshots/step-1-initial-page.png' });
      test.info().attach('Initial Page', { path: 'screenshots/step-1-initial-page.png', contentType: 'image/png' });
    });

    await ai(`wait for Calendly page to fully load`, { page, test })
    await ai(`Dismiss the privacy modal`, { page, test })
    await ai(`Click on the first day in the month with times available`, { page, test })
    await ai(`Then Click on the first available time in the sidebar`, { page, test })
    await ai(`Then Click the Next button`, { page, test })




    await test.step('Fill out the form with realistic values', async () => {
      await ai('Fill out the form with realistic values', { page, test });
      await page.screenshot({ path: 'screenshots/step-9-fill-form.png' });
      test.info().attach('Fill Form', { path: 'screenshots/step-9-fill-form.png', contentType: 'image/png' });
    });

    await test.step('Click the Schedule Event button', async () => {
      await page.getByText('Schedule Event').click();
      await page.screenshot({ path: 'screenshots/step-10-schedule-event.png' });
      test.info().attach('Schedule Event', { path: 'screenshots/step-10-schedule-event.png', contentType: 'image/png' });
    });

    await test.step('Verify that the "You are scheduled" text is present', async () => {
      const element = await page.getByText('You are scheduled');
      expect(element).toBeDefined();
      await page.screenshot({ path: 'screenshots/step-11-you-are-scheduled.png' });
      test.info().attach('You Are Scheduled', { path: 'screenshots/step-11-you-are-scheduled.png', contentType: 'image/png' });
    });

    await test.step('Wait for 5 seconds before taking the final screenshot', async () => {
      await page.waitForTimeout(5000);
      await page.screenshot({ path: 'screenshots/step-12-final.png' });
      test.info().attach('Final Screenshot', { path: 'screenshots/step-12-final.png', contentType: 'image/png' });
    });
  });
});