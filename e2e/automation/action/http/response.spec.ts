import { expect, test } from '@/e2e/fixtures'

test.describe('POST /api/automation/:path', () => {
  test('should run a response http action', async ({ startExampleApp }) => {
    // GIVEN
    const page = await startExampleApp({ filter: 'http/response' })

    // WHEN
    const response = await page.request.post('/api/automation/response')

    // THEN
    expect(response.status()).toBe(200)
    expect(await response.text()).toBe('OK')
  })

  test('should run a response http action with body', async ({ startExampleApp }) => {
    // GIVEN
    const page = await startExampleApp({ filter: 'http/response/post-body' })

    // WHEN
    const response = await page.request.post('/api/automation/response')
    const data = await response.json()

    // THEN
    expect(data).toEqual({ message: 'Hello, world!' })
  })

  test('should run a response http action with previous error', async ({ startExampleApp }) => {
    // GIVEN
    const page = await startExampleApp({ filter: 'http/response/previous-error' })

    // WHEN
    const response = await page.request.post('/api/automation/response')

    // THEN
    expect(response.status()).toBe(400)
    expect(await response.json()).toEqual({
      error: 'This is a test error',
    })
  })

  test('should run a response http action with previous action', async ({ startExampleApp }) => {
    // GIVEN
    const page = await startExampleApp({ filter: 'http/response/previous-action' })

    // WHEN
    const response = await page.request.post('/api/automation/response')
    const data = await response.json()

    // THEN
    expect(data).toEqual({ message: 'Hello world!' })
  })
})

test.describe('GET /api/automation/:path', () => {
  test('should run a response http action with body', async ({ startExampleApp }) => {
    // GIVEN
    const page = await startExampleApp({ filter: 'http/response/get-body' })

    // WHEN
    const response = await page.request.get('/api/automation/response')
    const data = await response.json()

    // THEN
    expect(data).toEqual({ message: 'Hello, world!' })
  })
})
