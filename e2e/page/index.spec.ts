import { expect, test } from '@/e2e/fixtures'

test('should return the home page', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  await page.goto('/')

  // THEN
  await expect(page).toHaveScreenshot()
})
