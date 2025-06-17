import { expect, test, type Page } from '@playwright/test'

export async function loginToAdmin(page: Page) {
  await test.step('Login as admin', async () => {
    await page.goto('/admin/login')
    await page.locator('input#email').fill('admin@admin.com')
    await page.locator('input#password').fill('admin')
    await page.locator('button[type="submit"]').click()
    await page.waitForURL('/admin')
    await expect(page.getByRole('heading', { name: 'Dashboard', level: 1 })).toBeVisible()
  })
}

export async function connectTo(service: string, page: Page) {
  await test.step(`Connect to ${service}`, async () => {
    await page.goto('/admin/connections')
    await page.getByRole('button', { name: 'Open menu' }).click()
    const [popup] = await Promise.all([
      page.waitForEvent('popup'),
      page.getByRole('menuitem', { name: 'Connect account' }).click(),
    ])
    await popup.goto(`/api/connections/auth?state={"id":1}&code=AUTH_CODE`)
    await popup.close()
    await page.reload()
    await expect(page.getByRole('cell', { name: 'Connected', exact: true })).toBeVisible()
  })
}
