import { expect, test } from '@/e2e/fixtures'

// TODO: [@thomas-jeanneau] - should display a form with an phone input
test.skip('should display a form with an phone input', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  await page.goto('/form/contact-us')

  // THEN
  expect(page.getByLabel('Phone')).toBeVisible()
})
