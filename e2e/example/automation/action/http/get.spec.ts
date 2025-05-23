import { expect, test } from '@/e2e/fixtures'

test('should run a get http action', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  const response = await page.request.post('/api/automation/get')

  // THEN
  expect(response.status()).toBe(200)
  const data = await response.json()
  expect(data.url).toBe('https://httpbin.org/get')
})
