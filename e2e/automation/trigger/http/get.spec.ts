import { expect, test } from '@/e2e/fixtures'

test.describe('GET /api/automation/:path', () => {
  test('should not found the automation with a post request', async ({ startExampleApp }) => {
    // GIVEN
    const page = await startExampleApp({ filter: 'http/get' })

    // WHEN
    const response = await page.request.post('/api/automation/get')

    // THEN
    expect(response.status()).toBe(404)
  })

  test('should not found the automation with a wrong path', async ({ startExampleApp }) => {
    // GIVEN
    const page = await startExampleApp({ filter: 'http/get' })

    // WHEN
    const response = await page.request.get('/api/automation/wrong-path')

    // THEN
    expect(response.status()).toBe(404)
  })

  test('should trigger an automation', async ({ startExampleApp }) => {
    // GIVEN
    const page = await startExampleApp({ filter: 'http/get' })

    // WHEN
    const response = await page.request.get('/api/automation/get')

    // THEN
    expect(response.status()).toBe(200)
    expect(await response.text()).toBe('OK')
  })

  test('should trigger an automation with immediate response', async ({ startExampleApp }) => {
    // GIVEN
    const page = await startExampleApp({ filter: 'http/get/respond-immediately' })

    // WHEN
    const response = await page.request.get('/api/automation/get')

    // THEN
    expect(response.status()).toBe(200)
    expect(await response.text()).toBe('OK')
  })
})
