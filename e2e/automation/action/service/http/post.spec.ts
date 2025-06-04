import { expect, test } from '@/e2e/fixtures'

test('should run a post http action', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  const response = await page.request.post('/api/automations/post')

  // THEN
  expect(response.status()).toBe(200)
  const { data } = await response.json()
  expect(data.url).toBe('/api/automations/post-response')
})

test('should run a post http action with headers', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ filter: 'headers', test })

  // WHEN
  const response = await page.request.post('/api/automations/post')

  // THEN
  const { data } = await response.json()
  expect(data.headers['x-custom-header']).toBe('test')
})

test('should run a post http action with env headers', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ filter: 'env', test, env: { TEST_HEADER: 'test' } })

  // WHEN
  const response = await page.request.post('/api/automations/post')

  // THEN
  const { data } = await response.json()
  expect(data.headers['x-custom-header']).toBe('test')
})

test('should run a post http action with default env headers', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ filter: 'default-env', test })

  // WHEN
  const response = await page.request.post('/api/automations/post')

  // THEN
  const { data } = await response.json()
  expect(data.headers['x-custom-header']).toBe('test')
})

test('should run a post http action with body', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({
    filter: 'body',
    test,
  })

  // WHEN
  const response = await page.request.post('/api/automations/post')

  // THEN
  const { data } = await response.json()
  expect(data.json).toEqual({ message: 'Hello, world!' })
})
