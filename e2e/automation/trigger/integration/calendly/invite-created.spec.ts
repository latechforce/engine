import type { RunDto } from '../../../../../src/features/run/application/dto/run.dto'
import { expect, test } from '../../../../fixtures'
import { connectTo } from '../../../../steps'
import { webhookPayloadInviteCreated } from '../../../../__mocks__/calendly'

test('should trigger an automation when a calendly invite is created', async ({
  startExampleApp,
}) => {
  // GIVEN
  const { page } = await startExampleApp({ test, loggedOnAdmin: true })

  // WHEN
  await connectTo('calendly', page)
  await page.request.post('/api/automations/calendly-invite-created', {
    data: webhookPayloadInviteCreated,
  })

  // THEN
  const response = await page.request.get('/api/runs')
  const { runs }: { runs: RunDto[] } = await response.json()
  expect(runs.length).toBe(1)
  expect(runs[0]?.automation_name).toBe('calendly')
  expect(runs[0]?.status).toBe('success')
})
