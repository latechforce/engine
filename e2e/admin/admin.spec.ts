import { expect, test } from '@/e2e/fixtures'

test.describe('GET /_admin/openapi', () => {
  test('should not return the admin openapi if not authenticated', async ({ startExampleApp }) => {
    // GIVEN
    const page = await startExampleApp()

    // WHEN
    await page.goto('/_admin/openapi')
    await page.waitForURL('/_admin/login')

    // THEN
    expect(page.url()).toContain('/_admin/login')
  })

  test('should return the admin openapi', async ({ startExampleApp }) => {
    // GIVEN
    const page = await startExampleApp({ loggedOnAdmin: true })

    // WHEN
    await page.goto('/_admin/openapi')

    // THEN
    expect(page.url()).toContain('/_admin/openapi')
  })
})

test.describe('GET /_admin', () => {
  test('should redirect to the login page if not authenticated', async ({ startExampleApp }) => {
    // GIVEN
    const page = await startExampleApp()

    // WHEN
    await page.goto('/_admin')
    await page.waitForURL('/_admin/login')

    // THEN
    expect(page.url()).toContain('/_admin/login')
  })

  test('should return the admin dashboard', async ({ startExampleApp }) => {
    // GIVEN
    const page = await startExampleApp({ loggedOnAdmin: true })

    // WHEN
    await page.goto('/_admin')

    // THEN
    await expect(page).toHaveScreenshot()
  })
})

test.describe('GET /_admin/login', () => {
  test('should return the admin login page', async ({ startExampleApp }) => {
    // GIVEN
    const page = await startExampleApp()

    // WHEN
    await page.goto('/_admin/login')

    // THEN
    await expect(page).toHaveScreenshot()
  })

  test('should not be able to login to the admin dashboard with wrong email and password', async ({
    startExampleApp,
  }) => {
    // GIVEN
    const page = await startExampleApp()

    // WHEN
    await page.goto('/_admin/login')
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
    const page = await startExampleApp()

    // WHEN
    await page.goto('/_admin/login')
    await page.locator('input#email').fill('admin@admin.com')
    await page.locator('input#password').fill('admin')
    await page.locator('button[type="submit"]').click()
    await page.waitForURL('/_admin')

    // THEN
    expect(page.url()).toContain('/_admin')
  })
})
