import { expect, test } from '@/e2e/fixtures'

test('should run a JavaScript code', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  const response = await page.request.post('/api/automations/run-javascript')

  // THEN
  expect(response.status()).toBe(200)
  const { data } = await response.json()
  expect(data).toEqual({ message: 'Hello, world!' })
})

test('should run a JavaScript code with input data', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ filter: 'input-data', test })

  // WHEN
  const response = await page.request.post('/api/automations/run-javascript', {
    data: {
      name: 'John',
    },
  })

  // THEN
  expect(response.status()).toBe(200)
  const { data } = await response.json()
  expect(data).toEqual({ message: 'Hello, John!' })
})

test('should return an error when the code throw an error', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ filter: 'error', test })

  // WHEN
  const response = await page.request.post('/api/automations/run-javascript')

  // THEN
  expect(response.status()).toBe(400)
  const { error } = await response.json()
  expect(error).toEqual('This is a test error')
})

test('should run a JavaScript code with externals', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ filter: 'externals', test })

  // WHEN
  const response = await page.request.post('/api/automations/run-javascript')
  const { data } = await response.json()

  // THEN
  expect(data).toEqual({ message: 'Hello, world!' })
})

test('should run a JavaScript code with globals variables', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ filter: 'globals', test })

  // WHEN
  const response = await page.request.post('/api/automations/run-javascript')
  const { data } = await response.json()

  // THEN
  expect(data.date).toBe('2025-01-01T00:00:00.000Z')
})
