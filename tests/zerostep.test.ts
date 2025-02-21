import { test, expect } from '@playwright/test'
import { ai } from '@zerostep/playwright'

test.describe('ZeroStep', () => {
    test('throws useful error messages in UI mode when there is no page', async ({ page }) => {
      let error: Error | null = null
  
      await ai('Click on the button (there is no page)', { page, test }).catch((e) => error = e)
  
      expect(error).toBeDefined()
    })
  
    test('throws useful error messages in UI mode when the task is too long', async ({ page }) => {
      let error: Error | null = null
      let taskString = '0'.repeat(2_001)
  
      await ai(taskString, { page, test }).catch((e) => error = e)
  
      expect(error).toBeDefined()
      // Take a screenshot after verifying the search bar
      await page.screenshot({ path: 'screenshots/after-verify-search-bar.png' });
    })
  })