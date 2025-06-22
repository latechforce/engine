import { expect, test } from '@/e2e/fixtures'
import type { GetRunDto } from '../../../../src/features/run/application/dto/get-run.dto'

test('should trigger the automation with a cron time', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, loggedOnAdmin: true })

  // WHEN
  await new Promise((resolve) => setTimeout(resolve, 5000))

  // THEN
  const response = await page.request.get('/api/runs')
  const { runs } = await response.json()
  expect(runs.length).toBeGreaterThanOrEqual(2)
  expect(runs[0].status).toBe('success')
  expect(runs[1].status).toBe('success')
  const firstRun = await page.request.get(`/api/runs/${runs[1].id}`)
  const { steps: firstRunSteps }: GetRunDto = await firstRun.json()
  const secondRun = await page.request.get(`/api/runs/${runs[0].id}`)
  const { steps: secondRunSteps }: GetRunDto = await secondRun.json()
  expect(secondRunSteps[0].output.dateTime).toBeDefined()
  expect(secondRunSteps[0].output.timestamp).toBeGreaterThan(
    firstRunSteps[0].output.timestamp as number
  )
})
