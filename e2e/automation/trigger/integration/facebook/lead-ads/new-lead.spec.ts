import type { RunDto } from '../../../../../../src/features/run/application/dto/run.dto'
import { expect, test } from '@/e2e/fixtures'
import { connectTo } from '@/e2e/steps'

// TODO: [@thomas-jeanneau] - should trigger an automation when a facebook lead ads new lead is created
test.skip('should trigger an automation when a facebook lead ads new lead is created', async ({
  startExampleApp,
}) => {
  // GIVEN
  const { page } = await startExampleApp({ test, loggedOnAdmin: true })

  // WHEN
  await connectTo('facebook', page)
  await page.request.post('/api/automations/facebook-lead-ads-new-lead')

  // THEN
  const response = await page.request.get('/api/runs')
  const data: RunDto[] = await response.json()
  expect(data.length).toBe(1)
  expect(data[0]?.automation_name).toBe('facebook-lead-ads')
  expect(data[0]?.status).toBe('success')
})
