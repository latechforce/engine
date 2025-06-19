import { expect, test } from '@/e2e/fixtures'

test('should not create a record from a POST request with missing required fields', async ({
  startExampleApp,
}) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'table/required' })
  const text = 'John'

  // WHEN
  const response = await page.request.post('/api/tables/Users', {
    data: {
      fields: { 'First name': text },
    },
  })

  // THEN
  expect(response.status()).toBe(400)
  const { error } = await response.json()
  expect(error).toBe("Invalid record: must have required property 'Last name'")
})

test('should create a record from a POST request', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'table/index' })
  const text = 'John'

  // WHEN
  const response = await page.request.post('/api/tables/Users', {
    data: {
      fields: { 'First name': text },
    },
  })

  // THEN
  expect(response.status()).toBe(201)
  const { record } = await response.json()
  expect(record.id).toBeDefined()
  expect(record.createdAt).toBeDefined()
  expect(record.updatedAt).toBeDefined()
  expect(record.fields).toEqual({
    'First name': text,
  })
})

test('should not create multiple records from a POST request with missing required fields', async ({
  startExampleApp,
}) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'table/required' })

  // WHEN
  const response = await page.request.post('/api/tables/Users', {
    data: {
      records: [
        {
          fields: { 'First name': 'John' },
        },
        {
          fields: { 'Last name': 'Doe' },
        },
      ],
    },
  })

  // THEN
  expect(response.status()).toBe(400)
  const { error } = await response.json()
  expect(error).toBe("Invalid record: must have required property 'Last name'")
})

test('should create multiple records from a POST request', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'table/index' })

  // WHEN
  const response = await page.request.post('/api/tables/Users', {
    data: {
      records: [
        {
          fields: { 'First name': 'John' },
        },
        {
          fields: { 'First name': 'John' },
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
    'First name': 'John',
  })
  expect(records[1].id).toBeDefined()
  expect(records[1].createdAt).toBeDefined()
  expect(records[1].updatedAt).toBeDefined()
  expect(records[1].fields).toEqual({
    'First name': 'John',
  })
})

test('should read a record from a GET request', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'table/index' })
  const text = 'John'
  const postResponse = await page.request.post('/api/tables/Users', {
    data: {
      fields: { 'First name': text },
    },
  })
  const {
    record: { id },
  } = await postResponse.json()

  // WHEN
  const response = await page.request.get(`/api/tables/Users/${id}`)

  // THEN
  expect(response.status()).toBe(200)
  const { record } = await response.json()
  expect(record.id).toBeDefined()
  expect(record.createdAt).toBeDefined()
  expect(record.updatedAt).toBeDefined()
  expect(record.fields).toEqual({
    'First name': text,
  })
})

test('should list records from a GET request', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'table/index' })
  await page.request.post('/api/tables/Users', {
    data: {
      records: [
        {
          fields: { 'First name': 'John' },
        },
        {
          fields: { 'First name': 'John' },
        },
      ],
    },
  })

  // WHEN
  const response = await page.request.get(`/api/tables/Users`)

  // THEN
  expect(response.status()).toBe(200)
  const { records } = await response.json()
  expect(records.length).toBe(2)
  expect(records[0].id).toBeDefined()
  expect(records[0].createdAt).toBeDefined()
  expect(records[0].updatedAt).toBeDefined()
  expect(records[0].fields).toEqual({
    'First name': 'John',
  })
  expect(records[1].id).toBeDefined()
  expect(records[1].createdAt).toBeDefined()
  expect(records[1].updatedAt).toBeDefined()
  expect(records[1].fields).toEqual({
    'First name': 'John',
  })
})

test('should update a record from a PATCH request', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'table/index' })
  const text = 'John'
  const postResponse = await page.request.post('/api/tables/Users', {
    data: {
      fields: { 'First name': text },
    },
  })
  const {
    record: { id },
  } = await postResponse.json()

  // WHEN
  const patchResponse = await page.request.patch(`/api/tables/Users/${id}`, {
    data: {
      fields: { 'First name': 'John Updated' },
    },
  })

  // THEN
  expect(patchResponse.status()).toBe(200)
  const { record } = await patchResponse.json()
  expect(record.id).toBeDefined()
  expect(record.createdAt).toBeDefined()
  expect(record.updatedAt).toBeDefined()
  expect(record.fields).toEqual({
    'First name': 'John Updated',
  })
})

test('should update multiple records from a PATCH request', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'table/index' })
  const postResponse = await page.request.post('/api/tables/Users', {
    data: {
      records: [
        {
          fields: { 'First name': 'John' },
        },
        {
          fields: { 'First name': 'John' },
        },
      ],
    },
  })
  const {
    records: [{ id: id1 }, { id: id2 }],
  } = await postResponse.json()

  // WHEN
  const patchResponse = await page.request.patch(`/api/tables/Users`, {
    data: {
      records: [
        {
          id: id1,
          fields: { 'First name': 'John Updated' },
        },
        {
          id: id2,
          fields: { 'First name': 'John Updated' },
        },
      ],
    },
  })

  // THEN
  expect(patchResponse.status()).toBe(200)
  const { records } = await patchResponse.json()
  expect(records.length).toBe(2)
  expect(records[0].id).toBeDefined()
  expect(records[0].createdAt).toBeDefined()
  expect(records[0].updatedAt).toBeDefined()
  expect(records[0].fields).toEqual({
    'First name': 'John Updated',
  })
  expect(records[1].id).toBeDefined()
  expect(records[1].createdAt).toBeDefined()
  expect(records[1].updatedAt).toBeDefined()
  expect(records[1].fields).toEqual({
    'First name': 'John Updated',
  })
})

test('should delete a record from a DELETE request', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'table/index' })
  const text = 'John'
  const postResponse = await page.request.post('/api/tables/Users', {
    data: {
      fields: { 'First name': text },
    },
  })
  const {
    record: { id },
  } = await postResponse.json()

  // WHEN
  const response = await page.request.delete(`/api/tables/Users/${id}`)

  // THEN
  expect(response.status()).toBe(200)
  const result = await response.json()
  expect(result.id).toBe(id)
  expect(result.deleted).toBe(true)
})

test('should delete multiple records from a DELETE request', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'table/index' })
  const postResponse = await page.request.post('/api/tables/Users', {
    data: {
      records: [
        {
          fields: { 'First name': 'John' },
        },
        {
          fields: { 'First name': 'John' },
        },
      ],
    },
  })
  const {
    records: [{ id: id1 }, { id: id2 }],
  } = await postResponse.json()

  // WHEN
  const response = await page.request.delete(`/api/tables/Users?ids=${id1}&ids=${id2}`)

  // THEN
  expect(response.status()).toBe(200)
  const { records } = await response.json()
  expect(records.length).toBe(2)
  expect(records[0].id).toBe(id1)
  expect(records[0].deleted).toBe(true)
  expect(records[1].id).toBe(id2)
  expect(records[1].deleted).toBe(true)
})
