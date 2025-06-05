import { expect, test } from '@/e2e/fixtures'

test('should run action with inputData parsed in JSON', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'json' })

  // WHEN
  const response = await page.request.post('/api/automations/run-typescript', {
    data: {
      message: 'Hello, world!',
    },
  })

  // THEN
  expect(response.status()).toBe(200)
  const { data } = await response.json()
  expect(data).toEqual({ message: 'Hello, world!' })
})

test('should run action with inputData parsed in boolean', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'boolean' })

  // WHEN
  const response = await page.request.post('/api/automations/run-typescript', {
    data: {
      success: true,
    },
  })

  // THEN
  expect(response.status()).toBe(200)
  const { data } = await response.json()
  expect(data).toEqual({ success: true })
})

test('should run action with inputData parsed in number', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'number' })

  // WHEN
  const response = await page.request.post('/api/automations/run-typescript', {
    data: {
      amount: 100,
    },
  })

  // THEN
  expect(response.status()).toBe(200)
  const { data } = await response.json()
  expect(data).toEqual({ amount: 100 })
})

test('should run action with env variables in inputData', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'env' })

  // WHEN
  const response = await page.request.post('/api/automations/run-typescript')

  // THEN
  expect(response.status()).toBe(200)
  const { data } = await response.json()
  expect(data).toEqual({ apiKey: '1234567890' })
})

test('should run action with default env variables in inputData', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'default-env' })

  // WHEN
  const response = await page.request.post('/api/automations/run-typescript')

  // THEN
  expect(response.status()).toBe(200)
  const { data } = await response.json()
  expect(data).toEqual({ apiKey: '9876543210' })
})
