import { expect, test } from '@/e2e/fixtures'

test('should trigger the automation with a cron time', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  await new Promise((resolve) => setTimeout(resolve, 5000))

  // THEN
  const response = await page.request.get('/api/runs')
  const { runs } = await response.json()
  expect(runs.length).toBeGreaterThanOrEqual(2)
  expect(runs[0].status).toBe('success')
  expect(runs[1].status).toBe('success')
  const firstRun = await page.request.get(`/api/runs/${runs[1].id}`)
  const { data: firstRunData } = await firstRun.json()
  const secondRun = await page.request.get(`/api/runs/${runs[0].id}`)
  const { data: secondRunData } = await secondRun.json()
  expect(secondRunData.trigger.dateTime).toBeDefined()
  expect(secondRunData.trigger.timestamp).toBeGreaterThan(firstRunData.trigger.timestamp)
})
