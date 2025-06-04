import type { GetRunDto } from '../../src/features/run/application/dto/get-run.dto'
import type { ListRunsDto } from '../../src/features/run/application/dto/list-runs.dto'
import { expect, test } from '../fixtures'

test('should return a list of runs', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'trigger/service/http/post' })
  await page.request.post('/api/automations/post')

  // WHEN
  const response = await page.request.get('/api/runs')

  // THEN
  expect(response.status()).toBe(200)
  const { runs }: ListRunsDto = await response.json()
  expect(runs.length).toBe(1)
  expect(runs[0]?.automation_name).toBe('post')
  expect(runs[0]?.status).toBe('success')
  expect(runs[0]?.created_at).toBeDefined()
  expect(runs[0]?.updated_at).toBeDefined()
})

test('should return a run by id', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'trigger/service/http/post' })
  await page.request.post('/api/automations/post')
  const { runs }: ListRunsDto = await page.request.get('/api/runs').then((res) => res.json())
  const { id } = runs[0]!

  // WHEN
  const response = await page.request.get(`/api/runs/${id}`)

  // THEN
  expect(response.status()).toBe(200)
  const { run, data, automation_schema }: GetRunDto = await response.json()
  expect(run.automation_name).toBe('post')
  expect(run.status).toBe('success')
  expect(automation_schema).toBeDefined()
  expect(data).toBeDefined()
})
