import { expect, test } from '@/e2e/fixtures'
import { createPageResponse } from '@/e2e/__mocks__/notion'
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

test.fixme('should run a notion create page action', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  const response = await page.request.post('/api/automations/1')

  // THEN
  const { data }: { data: PageObjectResponse } = await response.json()
  expect(data).toStrictEqual(createPageResponse)
})
