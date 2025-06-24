import { expect, test } from '@/e2e/fixtures'

test('should display an error when the form is submitted', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  await page.goto('/forms/contact-us')
  await page.getByLabel('Name').fill('John Doe')
  await page.getByRole('button', { name: 'Submit' }).click()

  // THEN
  await expect(page.getByText('This is an error message')).toBeVisible()
})
