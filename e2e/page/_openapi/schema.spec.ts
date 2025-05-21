import { expect, test } from '@/e2e/fixtures'

test('should return 200', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  const response = await page.request.get('/_openapi/schema')

  // THEN
  expect(response.status()).toBe(200)
})

test('should return the openapi json', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({
    env: {
      PORT: '3001',
    },
    test,
  })

  // WHEN
  const response = await page.request.get('/_openapi/schema')

  // THEN
  const json = await response.text()
  expect(json).toMatchSnapshot()
})
