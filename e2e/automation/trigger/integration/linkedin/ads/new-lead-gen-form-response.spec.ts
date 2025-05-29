import type { RunDto } from '@/run/application/dto/run.dto'
import { expect, test } from '@/e2e/fixtures'
import { connectTo } from '@/e2e/steps'

// TODO: [@kermitsxb] - should trigger an automation when a linkedin ads new lead gen form response is created
test.skip('should trigger an automation when a linkedin ads new lead gen form response is created', async ({
  startExampleApp,
}) => {
  // GIVEN
  const { page } = await startExampleApp({ test, loggedOnAdmin: true })

  // WHEN
  await connectTo('linkedin', page)
  await page.request.post('/api/automations/linkedin-ads-new-lead-gen-form-response')

  // THEN
  const response = await page.request.get('/api/runs')
  const data: RunDto[] = await response.json()
  expect(data.length).toBe(1)
  expect(data[0]?.automation_name).toBe('linkedin-ads')
  expect(data[0]?.status).toBe('success')
})
