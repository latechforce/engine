import type { RunDto } from '@/application/dto/run.dto'
import { expect, test } from '@/e2e/fixtures'
import { connectTo } from '@/e2e/steps'
import { webhookPayloadInviteCreated } from '@/infrastructure/integration/calendly/__mock__'

test('should trigger an automation when a calendly invite is created', async ({
  startExampleApp,
}) => {
  // GIVEN
  const { page } = await startExampleApp({ test, loggedOnAdmin: true })

  // WHEN
  await connectTo('calendly', page)
  await page.request.post('/api/automation/calendly-invite-created', {
    data: webhookPayloadInviteCreated,
  })

  // THEN
  const response = await page.request.get('/api/runs')
  const data: RunDto[] = await response.json()
  expect(data.length).toBe(1)
  expect(data[0]?.automation_name).toBe('calendly')
  expect(data[0]?.status).toBe('success')
})
