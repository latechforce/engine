import { expect, test } from '@/e2e/fixtures'

test('should return a page with custom HTML', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  await page.goto('/custom-html')

  // THEN
  await expect(page.locator('h1')).toHaveText('Custom HTML page')
  await expect(page).toHaveURL('/custom-html')
  await expect(page).toHaveScreenshot()
})
