import { expect, test } from '@/e2e/fixtures'
import type { ListRunsDto } from '../../../../src/features/run/application/dto/list-runs.dto'
import type { GetRunDto } from '../../../../src/features/run/application/dto/get-run.dto'

test('should run an automation when a record is updated', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, loggedOnAdmin: true })
  const response = await page.request.post('/api/tables/users', {
    data: {
      fields: {
        name: 'John Doe',
      },
    },
  })
  const {
    record: { id },
  } = await response.json()

  // WHEN
  await page.request.patch(`/api/tables/users/${id}`, {
    data: {
      fields: {
        name: 'Jane Doe',
      },
    },
  })

  // THEN
  await page.waitForTimeout(1000)
  const responseRuns = await page.request.get('/api/runs')
  const { runs }: ListRunsDto = await responseRuns.json()
  expect(runs.length).toBe(1)
  expect(runs[0]!.automationName).toBe('record-updated')
  const responseRun = await page.request.get(`/api/runs/${runs[0]!.id}`)
  const { steps }: GetRunDto = await responseRun.json()
  expect(steps[0].output.fields).toEqual({ name: 'Jane Doe' })
})
