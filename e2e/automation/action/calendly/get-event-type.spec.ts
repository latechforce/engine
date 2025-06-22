import { expect, test } from '@/e2e/fixtures'
import { connectTo } from '@/e2e/steps'
import { getEventTypeResponse } from '@/e2e/__mocks__/calendly'
import type { GetEventTypeResponse } from '../../../../src/integrations/calendly/calendly.types'

test('should run a calendly get event type action', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, loggedOnAdmin: true })

  // WHEN
  await connectTo('calendly', page)
  const response = await page.request.post('/api/automations/1')

  // THEN
  const { data }: { data: GetEventTypeResponse } = await response.json()
  expect(data).toStrictEqual(getEventTypeResponse)
})
