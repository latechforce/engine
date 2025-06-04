import { expect, test } from '@/e2e/fixtures'

test('should run a JavaScript code', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  const response = await page.request.post('/api/automations/run-javascript')

  // THEN
  expect(response.status()).toBe(200)
  const { data } = await response.json()
  expect(data).toEqual({ message: 'Hello, world!' })
})

test('should run a JavaScript code with input data', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ filter: 'input-data', test })

  // WHEN
  const response = await page.request.post('/api/automations/run-javascript', {
    data: {
      name: 'John',
    },
  })

  // THEN
  expect(response.status()).toBe(200)
  const { data } = await response.json()
  expect(data).toEqual({ message: 'Hello, John!' })
})

test('should return an error when the code throw an error', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ filter: 'error', test })

  // WHEN
  const response = await page.request.post('/api/automations/run-javascript')

  // THEN
  expect(response.status()).toBe(500)
  const { error } = await response.json()
  expect(error).toEqual('This is a test error')
})

test('should run a JavaScript code with externals', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ filter: 'externals', test })

  // WHEN
  const response = await page.request.post('/api/automations/run-javascript')
  const { data } = await response.json()

  // THEN
  expect(data).toEqual({ message: 'Hello, world!' })
})

test('should run a JavaScript code with globals variables', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ filter: 'globals', test })

  // WHEN
  const response = await page.request.post('/api/automations/run-javascript')
  const { data } = await response.json()

  // THEN
  expect(data.date).toBe('2025-01-01T00:00:00.000Z')
})

test('should run a JavaScript code with tables', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ filter: 'tables', test })

  // WHEN
  const response = await page.request.post('/api/automations/run-javascript')
  const { data } = await response.json()

  // THEN
  expect(data.record.id).toBeDefined()
  expect(data.record.fields.name).toEqual('John Doe')
  expect(data.updatedRecord.fields.name).toEqual('Jane Doe')
  expect(data.exists).toBe(false)
  expect(data.list.length).toBe(1)
})

test('should run a JavaScript code with buckets', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ filter: 'buckets', test })

  // WHEN
  const response = await page.request.post('/api/automations/run-javascript')
  const { data } = await response.json()

  // THEN
  expect(data.data).toBeDefined()
  expect(data.list.length).toBe(1)
  expect(data.list[0].key).toBe('picture.jpg')
  expect(data.list[0].size).toBe(3)
  expect(data.list[0].contentType).toBe('image/jpeg')
  expect(data.list[0].createdAt).toBeDefined()
  expect(data.list[0].updatedAt).toBeDefined()
})

test('should run a JavaScript code that return an array', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ filter: 'array', test })

  // WHEN
  const response = await page.request.post('/api/automations/run-javascript')
  const { data } = await response.json()

  // THEN
  expect(data).toEqual({
    message: 'Hello, John Doe!',
  })
  const runsResponse = await page.request.get('/api/runs')
  const { runs } = await runsResponse.json()
  for (let i = 0; i < runs.length; i++) {
    const run = runs[i]!
    const runResponse = await page.request.get(`/api/runs/${run.id}`)
    const { data } = await runResponse.json()
    if (data.runJavaScriptCode.index === 0) {
      expect(data.runJavaScriptCode.name).toEqual('John Doe')
      expect(data.buildMessage).toEqual({
        message: 'Hello, John Doe!',
      })
    } else if (data.runJavaScriptCode.index === 1) {
      expect(data.runJavaScriptCode.name).toEqual('Jane Doe')
      expect(data.buildMessage).toEqual({
        message: 'Hello, Jane Doe!',
      })
    } else if (data.runJavaScriptCode.index === 2) {
      expect(data.runJavaScriptCode.name).toEqual('Jacob Doe')
      expect(data.buildMessage).toEqual({
        message: 'Hello, Jacob Doe!',
      })
    }
  }
})
