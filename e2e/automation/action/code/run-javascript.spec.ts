import { expect, test } from '@/e2e/fixtures'

test.describe('POST /api/automation/:path', () => {
  test('should run a JavaScript code', async ({ startExampleApp }) => {
    // GIVEN
    const page = await startExampleApp({ filter: 'automation/action/code/run-javascript' })

    // WHEN
    const response = await page.request.post('/api/automation/run-javascript')

    // THEN
    expect(response.status()).toBe(200)
    expect(await response.json()).toEqual({ message: 'Hello, world!' })
  })

  test('should run a JavaScript code with input data', async ({ startExampleApp }) => {
    // GIVEN
    const page = await startExampleApp({
      filter: 'automation/action/code/run-javascript/input-data',
    })

    // WHEN
    const response = await page.request.post('/api/automation/run-javascript', {
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
    const page = await startExampleApp({ filter: 'automation/action/code/run-javascript/error' })

    // WHEN
    const response = await page.request.post('/api/automation/run-javascript')

    // THEN
    expect(response.status()).toBe(400)
    expect(await response.json()).toEqual({
      error: 'This is a test error',
    })
  })

  test('should run a JavaScript code with externals', async ({ startExampleApp }) => {
    // GIVEN
    const page = await startExampleApp({
      filter: 'automation/action/code/run-javascript/externals',
    })

    // WHEN
    const response = await page.request.post('/api/automation/run-javascript')
    const data = await response.json()

    // THEN
    expect(data).toEqual({
      success: true,
      data: {
        name: 'John',
      },
    })
  })

  test('should run a JavaScript code with globals variables', async ({ startExampleApp }) => {
    // GIVEN
    const page = await startExampleApp({ filter: 'automation/action/code/run-javascript/globals' })

    // WHEN
    const response = await page.request.post('/api/automation/run-javascript')
    const data = await response.json()

    // THEN
    expect(data.date).toBe('2025-01-01T00:00:00.000Z')
  })

  test('should return an error when the code is invalid', async ({ startExampleApp }) => {
    // GIVEN
    const call = () =>
      startExampleApp({
        filter: 'automation/action/code/run-javascript/syntax-error',
      })

    // WHEN/THEN
    expect(call()).rejects.toThrow('Invalid Javascript code')
  })
})
