import { expect, test } from '@/e2e/fixtures'

test('should not return the admin api docs if not authenticated', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'table/index' })

  // WHEN
  await page.goto('/admin/api')
  await page.waitForURL('/admin/login')

  // THEN
  expect(page.url()).toContain('/admin/login')
})

test('should return the admin api docs', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ loggedOnAdmin: true, test, filter: 'table/index' })

  // WHEN
  await page.goto('/admin/api')

  // THEN
  expect(page.url()).toContain('/admin/api')
})
