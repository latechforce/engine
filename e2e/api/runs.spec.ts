import type { RunDto } from '@/application/dto/run.dto'
import { expect, test } from '@/e2e/fixtures'

test('should return a list of runs', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'trigger/service/http/post' })
  await page.request.post('/api/automation/post')

  // WHEN
  const response = await page.request.get('/api/runs')

  // THEN
  expect(response.status()).toBe(200)
  const runs: RunDto[] = await response.json()
  expect(runs.length).toBe(1)
  expect(runs[0]?.automation_name).toBe('post')
  expect(runs[0]?.status).toBe('success')
  expect(runs[0]?.created_at).toBeDefined()
  expect(runs[0]?.updated_at).toBeDefined()
})
