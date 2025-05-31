import { expect, test } from '@/e2e/fixtures'

test('should create a record from a POST request', async ({ startExampleApp }) => {
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

test('should read a record from a GET request', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })
  const text = 'Hello, world!'
  const postResponse = await page.request.post('/api/tables/My table', {
    data: { 'My field': text },
  })
  const {
    record: { id },
  } = await postResponse.json()

  // WHEN
  const response = await page.request.get(`/api/tables/My table/${id}`)

  // THEN
  expect(response.status()).toBe(200)
  const { record } = await response.json()
  expect(record.id).toBeDefined()
  expect(record.createdAt).toBeDefined()
  expect(record.updatedAt).toBeDefined()
  expect(record.fields).toEqual({
    'My field': text,
  })
})
