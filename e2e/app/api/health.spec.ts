import { expect, test } from '@/e2e/fixtures'

test('should return 200 OK', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  const response = await page.request.get('/api/health')

  // THEN
  expect(response.status()).toBe(200)
  expect(await response.text()).toBe('OK')
})
