import { expect, test } from '@/e2e/fixtures'

test('should display a form with an email input', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  await page.goto('/forms/contact-us')

  // THEN
  await expect(page.getByLabel('Email')).toBeVisible()
})
