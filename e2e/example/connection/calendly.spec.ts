import { expect, test } from '@/e2e/fixtures'

test('should connect to calendly', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, loggedOnAdmin: true })

  // WHEN
  await page.goto('/_admin/connections')
  await page.getByRole('button', { name: 'Open menu' }).click()
  const [popup] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByRole('menuitem', { name: 'Connect account' }).click(),
  ])
  await popup.waitForURL('https://calendly.com/app/login')
  await popup.goto(`/api/connection/auth?id=1&code=AUTH_CODE`)
  await popup.close()
  await page.reload()

  // THEN
  await expect(page.getByRole('cell', { name: 'Connected', exact: true })).toBeVisible()
})
