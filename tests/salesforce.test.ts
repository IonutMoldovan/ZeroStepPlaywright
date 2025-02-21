import { test, expect } from '@playwright/test'
import { ai } from '@zerostep/playwright'

// Replace these values with your Salesforce credentials
const email = 'test@example.com'
const password = 'passwordhere'
const hostname = 'realhostnamehere.develop.lightning.force.com'

test.describe('Salesforce', () => {
  test('create an opportunity', async ({ page }) => {
    test.skip(email === 'test@example.com', 'Replace placeholder values to run this test');

    await page.goto('https://login.salesforce.com')
    await ai(`Enter the username ${email}`, { page, test })
    await ai(`Enter the password ${password}`, { page, test })
    await page.click('text="Log In"')

    // Only reaches here if we are successfully authenticated
    await page.waitForSelector('text="Home"')

    // Navigate directly to Sales app
    await page.goto(`https://${hostname}/lightning/page/home`)
    await page.waitForSelector('text="Quarterly Performance"')

    await ai('Click on Opportunities link', { page, test })
    await page.click('text="New"')

    // Wait for 'New Opportunity' form to be displayed
    await page.waitForSelector('text="New Opportunity"')

    await ai(`Enter '12000' in the Amount field.`, { page, test })
    await ai('Enter Test in the opportunity name input', { page, test })

    const thirtyDaysFromNow = new Date()
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30)
    const closeDate = thirtyDaysFromNow.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    })

    await ai(`Input ${closeDate} into the Close Date field`, { page, test })
    await ai('Click on the Stage dropdown', { page, test })
    await ai('Click on the Needs Analysis option', { page, test })
    await ai('Click Save', { page, test })

    const result = await ai('What is the current stage of the opportunity?', { page, test })
    expect(result).toEqual('Needs Analysis')
    // Take a screenshot after verifying the search bar
    await page.screenshot({ path: 'screenshots/after-verify-search-bar.png' });
  })
})