import { expect, test } from '@/e2e/fixtures'

test('should upload a file', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'bucket/index', loggedOnAdmin: true })

  // WHEN
  const response = await page.request.put('/api/buckets/My bucket/my-file.txt', {
    data: 'Hello, world!',
    headers: {
      'Content-Type': 'text/plain',
    },
  })

  // THEN
  expect(response.status()).toBe(201)
  expect(await response.text()).toBe('Object uploaded')
  const listResponse = await page.request.get('/api/buckets/My bucket')
  expect(listResponse.status()).toBe(200)
  expect(await listResponse.json()).toEqual({
    objects: [
      {
        key: 'my-file.txt',
        contentType: 'text/plain',
        size: 13,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
    ],
  })
})

test('should not upload a file to a bucket that does not exist', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'bucket/index', loggedOnAdmin: true })

  // WHEN
  const response = await page.request.put('/api/buckets/invalid/my-file.txt', {
    data: 'Hello, world!',
    headers: {
      'Content-Type': 'text/plain',
    },
  })

  // THEN
  expect(response.status()).toBe(404)
  expect(await response.json()).toEqual({
    error: 'Bucket not found',
  })
})

test('should download a file', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'bucket/index', loggedOnAdmin: true })
  await page.request.put('/api/buckets/My bucket/my-file.txt', {
    data: 'Hello, world!',
    headers: {
      'Content-Type': 'text/plain',
    },
  })

  // WHEN
  const downloadResponse = await page.request.get('/api/buckets/My bucket/my-file.txt')

  // THEN
  expect(downloadResponse.status()).toBe(200)
  expect(await downloadResponse.text()).toBe('Hello, world!')
})

test('should not download a file that does not exist', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'bucket/index', loggedOnAdmin: true })

  // WHEN
  const downloadResponse = await page.request.get('/api/buckets/My bucket/my-file.txt')

  // THEN
  expect(downloadResponse.status()).toBe(404)
  expect(await downloadResponse.json()).toEqual({
    error: 'Object not found',
  })
})

test('should delete a file', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'bucket/index', loggedOnAdmin: true })
  await page.request.put('/api/buckets/My bucket/my-file.txt', {
    data: 'Hello, world!',
    headers: {
      'Content-Type': 'text/plain',
    },
  })

  // WHEN
  const response = await page.request.delete('/api/buckets/My bucket/my-file.txt')

  // THEN
  expect(response.status()).toBe(200)
  expect(await response.text()).toBe('Object deleted')
  const listResponse = await page.request.get('/api/buckets/My bucket')
  expect(listResponse.status()).toBe(200)
  expect(await listResponse.json()).toEqual({
    objects: [],
  })
})

test('should not delete a file that does not exist', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'bucket/index', loggedOnAdmin: true })

  // WHEN
  const response = await page.request.delete('/api/buckets/My bucket/my-file.txt')

  // THEN
  expect(response.status()).toBe(404)
  expect(await response.json()).toEqual({
    error: 'Object not found',
  })
})
