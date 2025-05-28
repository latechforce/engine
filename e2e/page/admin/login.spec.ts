import { expect, test } from '@/e2e/fixtures'

test('should return the admin login page', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  await page.goto('/admin/login')

  // THEN
  await expect(page).toHaveScreenshot()
})

test('should not be able to login to the admin dashboard with wrong email and password', async ({
  startExampleApp,
}) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  await page.goto('/admin/login')
  await page.locator('input#email').fill('admin@admin.com')
  await page.locator('input#password').fill('wrong-password')
  await page.locator('button[type="submit"]').click()

  // THEN
  expect(await page.waitForSelector('text=Invalid email or password')).toBeTruthy()
})

test('should be able to login to the admin dashboard with correct email and password', async ({
  startExampleApp,
}) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  await page.goto('/admin/login')
  await page.locator('input#email').fill('admin@admin.com')
  await page.locator('input#password').fill('admin')
  await page.locator('button[type="submit"]').click()
  await page.waitForURL('/admin')

  // THEN
  expect(page.url()).toContain('/admin')
})
