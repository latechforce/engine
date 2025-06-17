import { expect, test } from '@/e2e/fixtures'

test('should run a get http action', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  const response = await page.request.post('/api/automations/get')

  // THEN
  expect(response.status()).toBe(200)
  const { data } = await response.json()
  expect(data.url).toBe('/api/automations/get-response')
})

test('should run a get http action with headers', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ filter: 'headers', test })

  // WHEN
  const response = await page.request.post('/api/automations/get')

  // THEN
  const { data } = await response.json()
  expect(data.headers['x-custom-header']).toBe('test')
})
