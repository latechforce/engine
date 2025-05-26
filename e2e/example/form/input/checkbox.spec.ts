import { expect, test } from '@/e2e/fixtures'

// TODO: [@thomas-jeanneau] - should display a form with a checkbox input
test.skip('should display a form with a checkbox input', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  await page.goto('/form/contact-us')

  // THEN
  expect(page.getByLabel('I agree to the terms and conditions')).toBeVisible()
})
