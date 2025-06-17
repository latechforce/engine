import { expect, test } from '@/e2e/fixtures'
import { connectTo } from '@/e2e/steps'
import { appendValuesResponse } from '@/e2e/__mocks__/google/sheets'

test('should run a google sheets append values action', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, loggedOnAdmin: true })

  // WHEN
  await connectTo('google', page)
  const response = await page.request.post('/api/automations/append-values')

  // THEN
  const { data } = await response.json()
  expect(data).toStrictEqual(appendValuesResponse)
})
