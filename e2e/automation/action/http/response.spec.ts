import { expect, test } from '@/e2e/fixtures'

test('should run a response http action', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  const response = await page.request.post('/api/automations/response')

  // THEN
  expect(response.status()).toBe(200)
  const { success, runId } = await response.json()
  expect(success).toBe(true)
  expect(runId).toBeDefined()
})

test('should run a response http action with body from a post request', async ({
  startExampleApp,
}) => {
  // GIVEN
  const { page } = await startExampleApp({ filter: 'post-body', test })

  // WHEN
  const response = await page.request.post('/api/automations/response')
  const { data } = await response.json()

  // THEN
  expect(data).toEqual({ message: 'Hello, world!' })
})

test('should run a response http action with body from a get request', async ({
  startExampleApp,
}) => {
  // GIVEN
  const { page } = await startExampleApp({ filter: 'get-body', test })

  // WHEN
  const response = await page.request.get('/api/automations/response')
  const { data } = await response.json()

  // THEN
  expect(data).toEqual({ message: 'Hello, world!' })
})

test('should run a response http action with previous error', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ filter: 'previous-error', test })

  // WHEN
  const response = await page.request.post('/api/automations/response')

  // THEN
  expect(response.status()).toBe(500)
  const { error } = await response.json()
  expect(error).toEqual('This is a test error')
})

test('should run a response http action with previous action', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ filter: 'previous-action', test })

  // WHEN
  const response = await page.request.post('/api/automations/response')
  const { data } = await response.json()

  // THEN
  expect(data).toEqual({ message: 'Hello world!' })
})
