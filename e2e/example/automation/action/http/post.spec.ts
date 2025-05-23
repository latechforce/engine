import { expect, test } from '@/e2e/fixtures'

test('should run a post http action', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  const response = await page.request.post('/api/automation/post')

  // THEN
  expect(response.status()).toBe(200)
  const data = await response.json()
  expect(data.url).toBe('https://httpbin.org/post')
})

test('should run a post http action with headers', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ filter: 'headers', test })

  // WHEN
  const response = await page.request.post('/api/automation/post')

  // THEN
  const data = await response.json()
  expect(data.headers['X-Custom-Header']).toBe('test')
})
