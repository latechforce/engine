import { expect, test } from '@/e2e/fixtures'
import { connectTo } from '@/e2e/steps'

// TODO: [@thomas-jeanneau] - should run a google sheets create spreadsheet row action
test.skip('should run a google sheets create spreadsheet row action', async ({
  startExampleApp,
}) => {
  // GIVEN
  const { page } = await startExampleApp({ test, loggedOnAdmin: true })

  // WHEN
  await connectTo('google', page)
  const response = await page.request.post('/api/automation/list-webhook-subscriptions')

  // THEN
  const data = await response.json()
  expect(data).toStrictEqual({})
})
