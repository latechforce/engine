import { expect, test } from '@/e2e/fixtures'
import { searchPagesResponse } from '@/e2e/__mocks__/notion'

test.fixme('should run a notion search pages action', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  const response = await page.request.post('/api/automations/6')

  // THEN
  const { data } = await response.json()
  expect(data).toStrictEqual(searchPagesResponse)
})