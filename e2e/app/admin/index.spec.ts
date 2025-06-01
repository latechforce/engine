import { expect, test } from '@/e2e/fixtures'

test('should redirect to the login page if not authenticated', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  await page.goto('/admin')
  await page.waitForURL('/admin/login')

  // THEN
  expect(page.url()).toContain('/admin/login')
})

test('should return the admin dashboard', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ loggedOnAdmin: true, test })

  // WHEN
  await page.goto('/admin')

  // THEN
  await expect(page).toHaveScreenshot()
})
