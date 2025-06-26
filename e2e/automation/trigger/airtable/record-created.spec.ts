import { expect, test } from '@/e2e/fixtures'
import { connectTo } from '@/e2e/steps'
import type { RunDto } from '../../../../src/features/run/application/dto/run.dto'

test('should trigger an automation when a airtable record is created', async ({
  startExampleApp,
}) => {
  // GIVEN
  const { page } = await startExampleApp({ test, loggedOnAdmin: true })

  // WHEN
  await connectTo('airtable', page)
  await page.request.post('/api/automations/1', {
    data: {},
  })

  // THEN
  const response = await page.request.get('/api/runs')
  const { runs }: { runs: RunDto[] } = await response.json()
  expect(runs.length).toBe(1)
  expect(runs[0]?.automationName).toBe('airtable')
  expect(runs[0]?.status).toBe('success')
})
