import { expect, test } from '@/e2e/fixtures'
import { connectToCalendly } from '@/e2e/steps'
import { listWebhookSubscriptionsResponse } from '@/infrastructure/integration/calendly/__mock__'
import type { ListWebhookSubscriptionsResponse } from '@/infrastructure/integration/calendly/types'

test('should run a calendly list webhook subscriptions action', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, loggedOnAdmin: true })

  // WHEN
  await connectToCalendly(page)
  const response = await page.request.post('/api/automation/list-webhook-subscriptions')

  // THEN
  const data: ListWebhookSubscriptionsResponse = await response.json()
  expect(data).toStrictEqual(listWebhookSubscriptionsResponse)
})
