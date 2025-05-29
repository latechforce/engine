import { expect, test } from '@/e2e/fixtures'

test('should not found the automation with a post request', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  const response = await page.request.post('/api/automations/get')

  // THEN
  expect(response.status()).toBe(404)
})

test('should not found the automation with a wrong path', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  const response = await page.request.get('/api/automations/wrong-path')

  // THEN
  expect(response.status()).toBe(404)
})

test('should trigger an automation', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  const response = await page.request.get('/api/automations/get')

  // THEN
  expect(response.status()).toBe(200)
  expect(await response.text()).toBe('OK')
})

test('should trigger an automation with immediate response', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ filter: 'respond-immediately', test })

  // WHEN
  const response = await page.request.get('/api/automations/get')

  // THEN
  expect(response.status()).toBe(200)
  expect(await response.text()).toBe('OK')
})
