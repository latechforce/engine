import { expect, test } from '@/e2e/fixtures'
import { getPageResponse } from '@/e2e/__mocks__/notion'
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

test.fixme('should run a notion get page action', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  const response = await page.request.post('/api/automations/2')

  // THEN
  const { data }: { data: PageObjectResponse } = await response.json()
  expect(data).toStrictEqual(getPageResponse)
})