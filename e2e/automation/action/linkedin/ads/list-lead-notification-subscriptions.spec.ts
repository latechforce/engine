import { expect, test } from '@/e2e/fixtures'
import { connectTo } from '@/e2e/steps'
import type { ListLeadNotificationSubscriptionsResponse } from '../../../../../src/shared/integrations/social/linkedin/linkedin.types'

test('should run a linkedin list lead notification subscriptions action', async ({
  startExampleApp,
}) => {
  // GIVEN
  const { page } = await startExampleApp({ test, loggedOnAdmin: true })

  // WHEN
  await connectTo('linkedin', page)
  const response = await page.request.post('/api/automations/1')

  // THEN
  const { data }: { data: ListLeadNotificationSubscriptionsResponse } = await response.json()
  expect(Array.isArray(data.elements)).toBe(true)
  expect(data.elements?.length).toBeGreaterThanOrEqual(1)
  expect(data.elements?.[0]?.owner.organization).toBe('urn:li:organization:5622087')
})
