import type { GetRunDto } from '../../src/features/run/application/dto/get-run.dto'
import type { ListRunsDto } from '../../src/features/run/application/dto/list-runs.dto'
import { expect, test } from '../fixtures'

test('should return a list of runs', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'trigger/http/post', loggedOnAdmin: true })
  await page.request.post('/api/automations/post')

  // WHEN
  const response = await page.request.get('/api/runs')

  // THEN
  expect(response.status()).toBe(200)
  const { runs }: ListRunsDto = await response.json()
  expect(runs.length).toBe(1)
  expect(runs[0]?.automationName).toBe('post')
  expect(runs[0]?.status).toBe('success')
  expect(runs[0]?.createdAt).toBeDefined()
  expect(runs[0]?.updatedAt).toBeDefined()
})

test('should return a run by id', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'trigger/http/post', loggedOnAdmin: true })
  await page.request.post('/api/automations/post')
  const { runs }: ListRunsDto = await page.request.get('/api/runs').then((res) => res.json())
  const { id } = runs[0]!

  // WHEN
  const response = await page.request.get(`/api/runs/${id}`)

  // THEN
  expect(response.status()).toBe(200)
  const { run, steps }: GetRunDto = await response.json()
  expect(run.automationName).toBe('post')
  expect(run.status).toBe('success')
  expect(steps).toBeDefined()
})

test('should return a list of runs filtered by search on status', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({
    test,
    filter: 'automation/multiple',
    loggedOnAdmin: true,
  })
  await page.request.post('/api/automations/run-success')
  await page.request.post('/api/automations/run-failure')
  await page.request.post('/api/automations/run-success')

  // WHEN
  const response = await page.request.get('/api/runs?q=success')

  // THEN
  const { runs }: ListRunsDto = await response.json()
  expect(runs.length).toBe(2)
})

test('should return a list of runs filtered by automation id and search on status', async ({
  startExampleApp,
}) => {
  // GIVEN
  const { page } = await startExampleApp({
    test,
    filter: 'automation/multiple',
    loggedOnAdmin: true,
  })
  await page.request.post('/api/automations/run-success')
  await page.request.post('/api/automations/run-failure')
  await page.request.post('/api/automations/run-success')

  // WHEN
  const response = await page.request.get('/api/automations/1/runs?q=success')

  // THEN
  const { runs }: ListRunsDto = await response.json()
  expect(runs.length).toBe(2)
})

test('should return a list of runs filtered by search on run id', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({
    test,
    filter: 'automation/multiple',
    loggedOnAdmin: true,
  })
  const { runId } = await page.request
    .post('/api/automations/run-success')
    .then((res) => res.json())
  await page.request.post('/api/automations/run-failure')
  await page.request.post('/api/automations/run-success')

  // WHEN
  const response = await page.request.get(`/api/runs?q=${runId}`)

  // THEN
  const { runs }: ListRunsDto = await response.json()
  expect(runs.length).toBe(1)
})

test('should return a list of runs filtered by automation id and search on run id', async ({
  startExampleApp,
}) => {
  // GIVEN
  const { page } = await startExampleApp({
    test,
    filter: 'automation/multiple',
    loggedOnAdmin: true,
  })
  const { runId } = await page.request
    .post('/api/automations/run-success')
    .then((res) => res.json())
  await page.request.post('/api/automations/run-failure')
  await page.request.post('/api/automations/run-success')

  // WHEN
  const response = await page.request.get(`/api/automations/1/runs?q=${runId}`)

  // THEN
  const { runs }: ListRunsDto = await response.json()
  expect(runs.length).toBe(1)
})

test('should return a list of runs filtered by search on steps content', async ({
  startExampleApp,
}) => {
  // GIVEN
  const { page } = await startExampleApp({
    test,
    filter: 'automation/multiple',
    loggedOnAdmin: true,
  })
  await page.request.post('/api/automations/run-success')
  await page.request.post('/api/automations/run-failure')
  await page.request.post('/api/automations/run-success')

  // WHEN
  const response = await page.request.get(`/api/runs?q=Hello, world!`)

  // THEN
  const { runs }: ListRunsDto = await response.json()
  expect(runs.length).toBe(2)
})

test('should return a list of runs filtered by automation id and search on steps content', async ({
  startExampleApp,
}) => {
  // GIVEN
  const { page } = await startExampleApp({
    test,
    filter: 'automation/multiple',
    loggedOnAdmin: true,
  })
  await page.request.post('/api/automations/run-success')
  await page.request.post('/api/automations/run-failure')
  await page.request.post('/api/automations/run-success')

  // WHEN
  const response = await page.request.get(`/api/automations/1/runs?q=Hello, world!`)

  // THEN
  const { runs }: ListRunsDto = await response.json()
  expect(runs.length).toBe(2)
})
