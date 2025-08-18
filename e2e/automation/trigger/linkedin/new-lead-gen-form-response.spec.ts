import { expect, test } from '@/e2e/fixtures'
import { connectTo } from '@/e2e/steps'
import type { RunDto } from '../../../../src/features/run/application/dto/run.dto'

test('should set up LinkedIn new lead gen response trigger (creates subscription if none)', async ({
  startExampleApp,
}) => {
  // GIVEN
  const { page } = await startExampleApp({ test, loggedOnAdmin: true })

  // WHEN
  await connectTo('linkedin', page)
  await page.request.post('/api/automations/1')

  // THEN
  const response = await page.request.get('/api/runs')
  const { runs }: { runs: RunDto[] } = await response.json()
  expect(runs.length).toBe(1)
  expect(runs[0]?.automationName).toBe('linkedin-new-lead')
  expect(runs[0]?.status).toBe('success')
})
