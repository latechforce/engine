import { expect, test } from '@/e2e/fixtures'

test('should not return the admin openapi if not authenticated', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  await page.goto('/admin/openapi')
  await page.waitForURL('/admin/login')

  // THEN
  expect(page.url()).toContain('/admin/login')
})

test('should return the admin openapi', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ loggedOnAdmin: true, test })

  // WHEN
  await page.goto('/admin/openapi')

  // THEN
  expect(page.url()).toContain('/admin/openapi')
})
