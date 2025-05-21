import { expect, test } from '@/e2e/fixtures'

test('should not return the admin openapi if not authenticated', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  await page.goto('/_admin/openapi')
  await page.waitForURL('/_admin/login')

  // THEN
  expect(page.url()).toContain('/_admin/login')
})

test('should return the admin openapi', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ loggedOnAdmin: true, test })

  // WHEN
  await page.goto('/_admin/openapi')

  // THEN
  expect(page.url()).toContain('/_admin/openapi')
})
