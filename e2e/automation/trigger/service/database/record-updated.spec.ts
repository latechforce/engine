import { expect, test } from '@/e2e/fixtures'

test('should run an automation when a record is updated', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })
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
  const responseRuns = await page.request.get('/api/runs')
  const { runs } = await responseRuns.json()
  expect(runs.length).toBe(1)
  expect(runs[0].automation_name).toBe('record-updated')
  const responseRun = await page.request.get(`/api/runs/${runs[0].id}`)
  const { data } = await responseRun.json()
  expect(data.trigger.fields.name).toBe('Jane Doe')
})
