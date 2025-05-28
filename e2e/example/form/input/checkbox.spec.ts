import { expect, test } from '@/e2e/fixtures'

test('should display a form with a checkbox input', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  await page.goto('/form/contact-us')

  // THEN
  await expect(page.getByLabel('I agree to the terms and conditions')).toBeVisible()
})
