import { expect, test } from '@/e2e/fixtures'
import { webhookPayloadInviteCreated } from '@/infrastructure/integration/calendly/examples'
import type { RunSchema } from '@/infrastructure/validator/run.validator'

test('should trigger an automation when a calendly invite is created', async ({
  startExampleApp,
}) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  await page.request.post('/api/automation/calendly-invite-created', {
    data: webhookPayloadInviteCreated,
  })

  // THEN
  const response = await page.request.get('/api/runs')
  const data: RunSchema[] = await response.json()
  expect(data.length).toBe(1)
  expect(data[0]?.automation_schema.name).toBe('calendly')
  expect(data[0]?.status).toBe('success')
})
