import { expect, test } from '@/e2e/fixtures'

test('should display a form', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  await page.goto('/form/contact-us')

  // THEN
  await expect(page.getByRole('heading', { name: 'Contact Us' })).toBeVisible()
  await expect(page.getByText('Please fill in the form below to contact us.')).toBeVisible()
  await expect(page.getByLabel('Name')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible()
})
