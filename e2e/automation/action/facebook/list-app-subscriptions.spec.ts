import { expect, test } from '@/e2e/fixtures'
import { connectTo } from '@/e2e/steps'
import type { ListAppSubscriptionsResponse } from '../../../../src/integrations/facebook/facebook.types'

test('should run a facebook list app subscriptions action', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, loggedOnAdmin: true })

  // WHEN
  await connectTo('facebook', page)
  const response = await page.request.post('/api/automations/1')

  // THEN
  const { data }: { data: ListAppSubscriptionsResponse } = await response.json()
  expect(Array.isArray(data.data)).toBe(true)
  expect(data.data[0]?.object).toBe('page')
  expect(data.data[0]?.fields).toContain('leadgen')
})
