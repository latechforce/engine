import { expect, test } from '@/e2e/fixtures'
import { connectTo } from '@/e2e/steps'
import { listWebhookSubscriptionsResponse } from '@/e2e/__mocks__/calendly'
import type { ListWebhookSubscriptionsResponse } from '../../../../src/shared/integrations/productivity/calendly/calendly.types'

test('should run a calendly list webhook subscriptions action', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, loggedOnAdmin: true })

  // WHEN
  await connectTo('calendly', page)
  const response = await page.request.post('/api/automations/1')

  // THEN
  const { data }: { data: ListWebhookSubscriptionsResponse } = await response.json()
  expect(data).toStrictEqual(listWebhookSubscriptionsResponse)
})
