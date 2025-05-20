import { expect, test } from '@/e2e/fixtures'

test('should run a TypeScript code', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp()

  // WHEN
  const response = await page.request.post('/api/automation/run-typescript')

  // THEN
  expect(response.status()).toBe(200)
  expect(await response.json()).toEqual({ message: 'Hello, world!' })
})

test('should run a TypeScript code with input data', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ filter: 'input-data' })

  // WHEN
  const response = await page.request.post('/api/automation/run-typescript', {
    data: {
      name: 'John',
    },
  })

  // THEN
  expect(response.status()).toBe(200)
  expect(await response.json()).toEqual({ message: 'Hello, John!' })
})

test('should return an error when the code throw an error', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ filter: 'error' })

  // WHEN
  const response = await page.request.post('/api/automation/run-typescript')

  // THEN
  expect(response.status()).toBe(400)
  expect(await response.json()).toEqual({
    error: 'This is a test error',
  })
})

test('should run a TypeScript code with externals', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ filter: 'externals' })

  // WHEN
  const response = await page.request.post('/api/automation/run-typescript')
  const data = await response.json()

  // THEN
  expect(data).toEqual({
    success: true,
    data: {
      name: 'John',
    },
  })
})

test('should run a TypeScript code with globals variables', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ filter: 'globals' })

  // WHEN
  const response = await page.request.post('/api/automation/run-typescript')
  const data = await response.json()

  // THEN
  expect(data.date).toBe('2025-01-01T00:00:00.000Z')
})
