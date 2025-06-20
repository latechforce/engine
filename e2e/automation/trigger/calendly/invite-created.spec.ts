import { expect, test } from '@/e2e/fixtures'
import { connectTo } from '@/e2e/steps'
import { webhookPayloadInviteCreated } from '@/e2e/__mocks__/calendly'
import type { RunDto } from '../../../../src/features/run/application/dto/run.dto'

test('should trigger an automation when a calendly invite is created', async ({
  startExampleApp,
}) => {
  // GIVEN
  const { page } = await startExampleApp({ test, loggedOnAdmin: true })

  // WHEN
  await connectTo('calendly', page)
  await page.request.post('/api/automations/1', {
    data: webhookPayloadInviteCreated,
  })

  // THEN
  const response = await page.request.get('/api/runs')
  const { runs }: { runs: RunDto[] } = await response.json()
  expect(runs.length).toBe(1)
  expect(runs[0]?.automationName).toBe('calendly')
  expect(runs[0]?.status).toBe('success')
})
