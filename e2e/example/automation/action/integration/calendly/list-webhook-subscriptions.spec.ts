import { expect, test } from '@/e2e/fixtures'
import { connectTo } from '@/e2e/steps'
import { listWebhookSubscriptionsResponse } from '@/infrastructure/integration/calendly/__mock__'
import type { ListWebhookSubscriptionsResponse } from '@/infrastructure/integration/calendly/types'

test('should run a calendly list webhook subscriptions action', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, loggedOnAdmin: true })

  // WHEN
  await connectTo('calendly', page)
  const response = await page.request.post('/api/automation/list-webhook-subscriptions')

  // THEN
  const { data }: { data: ListWebhookSubscriptionsResponse } = await response.json()
  expect(data).toStrictEqual(listWebhookSubscriptionsResponse)
})
