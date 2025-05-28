import { expect, test } from '@/e2e/fixtures'

test('should display a form with a single line text input', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  await page.goto('/form/contact-us')

  // THEN
  await expect(page.getByLabel('Name')).toBeVisible()
})
