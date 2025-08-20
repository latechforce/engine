import { expect, test } from '@/e2e/fixtures'
import { connectTo } from '@/e2e/steps'
import { listWebhookPayloadsResponse } from '@/e2e/__mocks__/airtable'
import type { ListWebhookPayloadsResponse } from '../../../../src/shared/integrations/productivity/airtable/airtable.types'

test('should run a airtable list webhook payloads action', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, loggedOnAdmin: true })

  // WHEN
  await connectTo('airtable', page)
  const response = await page.request.post('/api/automations/1')

  // THEN
  const { data }: { data: ListWebhookPayloadsResponse } = await response.json()
  expect(data).toStrictEqual(listWebhookPayloadsResponse)
})
