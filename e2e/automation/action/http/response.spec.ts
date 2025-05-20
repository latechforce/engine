import { expect, test } from '@/e2e/fixtures'

test('should run a response http action', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp()

  // WHEN
  const response = await page.request.post('/api/automation/response')

  // THEN
  expect(response.status()).toBe(200)
  expect(await response.text()).toBe('OK')
})

test('should run a response http action with body from a post request', async ({
  startExampleApp,
}) => {
  // GIVEN
  const { page } = await startExampleApp({ filter: 'post-body' })

  // WHEN
  const response = await page.request.post('/api/automation/response')
  const data = await response.json()

  // THEN
  expect(data).toEqual({ message: 'Hello, world!' })
})

test('should run a response http action with body from a get request', async ({
  startExampleApp,
}) => {
  // GIVEN
  const { page } = await startExampleApp({ filter: 'get-body' })

  // WHEN
  const response = await page.request.get('/api/automation/response')
  const data = await response.json()

  // THEN
  expect(data).toEqual({ message: 'Hello, world!' })
})

test('should run a response http action with previous error', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ filter: 'previous-error' })

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
  const { page } = await startExampleApp({ filter: 'previous-action' })

  // WHEN
  const response = await page.request.post('/api/automation/response')
  const data = await response.json()

  // THEN
  expect(data).toEqual({ message: 'Hello world!' })
})
