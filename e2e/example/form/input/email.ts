import { expect, test } from '@/e2e/fixtures'

// TODO: [@thomas-jeanneau] - should display a form with an email input
test.skip('should display a form with an email input', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  await page.goto('/form/contact-us')

  // THEN
  expect(page.getByLabel('Email')).toBeVisible()
})
