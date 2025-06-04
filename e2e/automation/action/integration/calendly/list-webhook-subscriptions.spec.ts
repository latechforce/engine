import { expect, test } from '@/e2e/fixtures'
import { connectTo } from '@/e2e/steps'
import { listWebhookSubscriptionsResponse } from '../../../../../src/shared/infrastructure/integration/calendly/__mock__'
import type { ListWebhookSubscriptionsResponse } from '../../../../../src/shared/infrastructure/integration/calendly/types'

test('should run a calendly list webhook subscriptions action', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, loggedOnAdmin: true })

  // WHEN
  await connectTo('calendly', page)
  const response = await page.request.post('/api/automations/list-webhook-subscriptions')

  // THEN
  const { data }: { data: ListWebhookSubscriptionsResponse } = await response.json()
  expect(data).toStrictEqual(listWebhookSubscriptionsResponse)
})
