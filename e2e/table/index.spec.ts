import { expect, test } from '@/e2e/fixtures'

test('should create a record from API', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })
  const text = 'Hello, world!'

  // WHEN
  const response = await page.request.post('/api/tables/My table', {
    data: {
      'My field': text,
    },
  })

  // THEN
  expect(response.status()).toBe(201)
  const { record } = await response.json()
  expect(record.id).toBeDefined()
  expect(record.createdAt).toBeDefined()
  expect(record.updatedAt).toBeDefined()
  expect(record.fields).toEqual({
    'My field': text,
  })
})
