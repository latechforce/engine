import { expect, test } from '@/e2e/fixtures'
import { listPagesResponse } from '@/e2e/__mocks__/notion'

test.fixme('should run a notion list pages action', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  const response = await page.request.post('/api/automations/5')

  // THEN
  const { data } = await response.json()
  expect(data).toStrictEqual(listPagesResponse)
})