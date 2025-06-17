import { expect, test } from '@/e2e/fixtures'

test('should run an automation when a record is created', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  await page.request.post('/api/tables/users', {
    data: {
      fields: {
        name: 'John Doe',
      },
    },
  })

  // THEN
  await page.waitForTimeout(1000)
  const responseRuns = await page.request.get('/api/runs')
  const { runs } = await responseRuns.json()
  expect(runs.length).toBe(1)
  expect(runs[0].automation_name).toBe('record-created')
  const responseRun = await page.request.get(`/api/runs/${runs[0].id}`)
  const { data } = await responseRun.json()
  expect(data.trigger.fields.name).toBe('John Doe')
})
