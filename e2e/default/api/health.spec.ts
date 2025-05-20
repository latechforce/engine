import { expect, test } from '@/e2e/fixtures'

test('should return 200', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp()

  // WHEN
  const response = await page.request.get('/api/health')

  // THEN
  expect(response.status()).toBe(200)
})

test('should return OK', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp()

  // WHEN
  const response = await page.request.get('/api/health')

  // THEN
  expect(await response.text()).toBe('OK')
})
