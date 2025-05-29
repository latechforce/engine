import type { RunDto } from '@/run/application/dto/run.dto'
import { expect, test } from '@/e2e/fixtures'
import { connectTo } from '@/e2e/steps'

// TODO: [@kermitsxb] - should trigger an automation when a youcanbookme booking notifications is created
test.skip('should trigger an automation when a youcanbookme booking notifications is created', async ({
  startExampleApp,
}) => {
  // GIVEN
  const { page } = await startExampleApp({ test, loggedOnAdmin: true })

  // WHEN
  await connectTo('youcanbookme', page)
  await page.request.post('/api/automations/youcanbookme-booking-notifications')

  // THEN
  const response = await page.request.get('/api/runs')
  const data: RunDto[] = await response.json()
  expect(data.length).toBe(1)
  expect(data[0]?.automation_name).toBe('youcanbookme')
  expect(data[0]?.status).toBe('success')
})
