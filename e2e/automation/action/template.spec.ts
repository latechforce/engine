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
  expect(await response.json()).toEqual({ data: { message: 'Hello, world!' }, success: true })
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
  expect(await response.json()).toEqual({ data: { success: true }, success: true })
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
  expect(await response.json()).toEqual({ data: { amount: 100 }, success: true })
})
