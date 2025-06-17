import { expect, test } from '@/e2e/fixtures'
import { connectTo } from '@/e2e/steps'
import { sendEmailResponse } from '@/e2e/__mocks__/google/gmail'

test('should run a google gmail send email action', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, loggedOnAdmin: true })

  // WHEN
  await connectTo('google', page)
  const response = await page.request.post('/api/automations/send-email')

  // THEN
  const { data } = await response.json()
  expect(data).toStrictEqual(sendEmailResponse)
})
