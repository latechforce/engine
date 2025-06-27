import { expect, test } from '@/e2e/fixtures'
import type { ListRunsDto } from '../../../../src/features/run/application/dto/list-runs.dto'
import { connectTo } from '@/e2e/steps'

test('should run a JavaScript code', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  const response = await page.request.post('/api/automations/run-javascript')

  // THEN
  expect(response.status()).toBe(200)
  const { data, runId } = await response.json()
  expect(data).toEqual({ message: 'Hello, world!' })
  expect(runId).toBeDefined()
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
  expect(data.object.key).toBe('picture.jpg')
  expect(data.object.size).toBe(3)
  expect(data.object.contentType).toBe('image/jpeg')
  expect(data.object.createdAt).toBeDefined()
  expect(data.object.updatedAt).toBeDefined()
  expect(data.attachments.length).toBe(0)
})

test('should run a JavaScript code that return an array', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ filter: 'array', test, loggedOnAdmin: true })

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
    const { steps } = await runResponse.json()
    if (steps[1]?.output?.index === 1) {
      expect(steps[1]?.output?.name).toEqual('John Doe')
      expect(steps[2]?.output).toEqual({
        message: 'Hello, John Doe!',
      })
    } else if (steps[1]?.output?.index === 2) {
      expect(steps[1]?.output?.name).toEqual('Jane Doe')
      expect(steps[2]?.output).toEqual({
        message: 'Hello, Jane Doe!',
      })
    } else if (steps[1]?.output?.index === 3) {
      expect(steps[1]?.output?.name).toEqual('Jacob Doe')
      expect(steps[2]?.output).toEqual({
        message: 'Hello, Jacob Doe!',
      })
    }
  }
})

test('should filter a JavaScript code that return an empty array', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ filter: 'empty-array', test, loggedOnAdmin: true })

  // WHEN
  const response = await page.request.post('/api/automations/run-javascript')
  const { data } = await response.json()

  // THEN
  expect(data).toEqual([])
  const runsResponse = await page.request.get('/api/runs')
  const { runs }: ListRunsDto = await runsResponse.json()
  expect(runs[0]!.status).toBe('filtered')
})

test('should run a JavaScript code with actions', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ filter: 'actions', test, loggedOnAdmin: true })

  // WHEN
  await connectTo('airtable', page)
  const response = await page.request.post('/api/automations/run-javascript')
  const { data } = await response.json()

  // THEN
  expect(data.data.cursor).toBe(1)
})
