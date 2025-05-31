import { expect, test } from '@/e2e/fixtures'

test('should create a record from a POST request', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })
  const text = 'Hello, world!'

  // WHEN
  const response = await page.request.post('/api/tables/My table', {
    data: {
      fields: { 'My field': text },
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

test('should create multiple records from a POST request', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  const response = await page.request.post('/api/tables/My table', {
    data: {
      records: [
        {
          fields: { 'My field': 'Hello, world!' },
        },
        {
          fields: { 'My field': 'Hello, world!' },
        },
      ],
    },
  })

  // THEN
  expect(response.status()).toBe(201)
  const { records } = await response.json()
  expect(records.length).toBe(2)
  expect(records[0].id).toBeDefined()
  expect(records[0].createdAt).toBeDefined()
  expect(records[0].updatedAt).toBeDefined()
  expect(records[0].fields).toEqual({
    'My field': 'Hello, world!',
  })
  expect(records[1].id).toBeDefined()
  expect(records[1].createdAt).toBeDefined()
  expect(records[1].updatedAt).toBeDefined()
  expect(records[1].fields).toEqual({
    'My field': 'Hello, world!',
  })
})

test('should read a record from a GET request', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })
  const text = 'Hello, world!'
  const postResponse = await page.request.post('/api/tables/My table', {
    data: {
      fields: { 'My field': text },
    },
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

test('should list records from a GET request', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })
  await page.request.post('/api/tables/My table', {
    data: {
      records: [
        {
          fields: { 'My field': 'Hello, world!' },
        },
        {
          fields: { 'My field': 'Hello, world!' },
        },
      ],
    },
  })

  // WHEN
  const response = await page.request.get(`/api/tables/My table`)

  // THEN
  expect(response.status()).toBe(200)
  const { records } = await response.json()
  expect(records.length).toBe(2)
  expect(records[0].id).toBeDefined()
  expect(records[0].createdAt).toBeDefined()
  expect(records[0].updatedAt).toBeDefined()
  expect(records[0].fields).toEqual({
    'My field': 'Hello, world!',
  })
  expect(records[1].id).toBeDefined()
  expect(records[1].createdAt).toBeDefined()
  expect(records[1].updatedAt).toBeDefined()
  expect(records[1].fields).toEqual({
    'My field': 'Hello, world!',
  })
})
