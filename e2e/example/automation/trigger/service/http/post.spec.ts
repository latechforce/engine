import { expect, test } from '@/e2e/fixtures'

test('should not found the automation with a get request', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  const response = await page.request.get('/api/automation/post')

  // THEN
  expect(response.status()).toBe(404)
})

test('should not found the automation with a wrong path', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  const response = await page.request.post('/api/automation/wrong-path')

  // THEN
  expect(response.status()).toBe(404)
})

test('should trigger an automation', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  const response = await page.request.post('/api/automation/post')

  // THEN
  expect(response.status()).toBe(200)
  expect(await response.text()).toBe('OK')
})

test('should trigger an automation with immediate response', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ filter: 'respond-immediately', test })

  // WHEN
  const response = await page.request.post('/api/automation/post')

  // THEN
  expect(response.status()).toBe(200)
  expect(await response.text()).toBe('OK')
})

test('should not trigger an automation with a invalid body', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ filter: 'request-body', test })

  // WHEN
  const response = await page.request.post('/api/automation/post', {
    data: {
      date: '2021-01-01',
    },
  })

  // THEN
  expect(response.status()).toBe(400)
  expect(await response.json()).toEqual({ error: 'Invalid body' })
})

test('should trigger an automation with a valid body', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ filter: 'request-body', test })

  // WHEN
  const response = await page.request.post('/api/automation/post', {
    data: {
      name: 'John Doe',
    },
  })

  // THEN
  const { data } = await response.json()
  expect(data.message).toBe('Hello, John Doe!')
})
