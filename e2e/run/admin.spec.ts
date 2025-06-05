import { expect, test } from '@/e2e/fixtures'

// TODO: [@thomas-jeanneau] - should search and display an automation run
test.skip('should search and display automation runs', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'run-typescript', loggedOnAdmin: true })

  // WHEN
  await page.goto('/admin/automation/history')

  // THEN
})

// TODO: [@thomas-jeanneau] - should select and replay failed automation runs
test.skip('should select and replay failed automation runs', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'run-typescript', loggedOnAdmin: true })

  // WHEN
  await page.goto('/admin/automation/history')

  // THEN
})

test('should open and display an automation run', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'run-typescript', loggedOnAdmin: true })
  const response = await page.request.post('/api/automations/run-typescript')
  const { runId } = await response.json()

  // WHEN
  await page.goto('/admin/runs')
  await page.getByRole('row', { name: 'run-typescript' }).click()
  await page.waitForURL(`/admin/runs/${runId}`)

  // THEN
  await expect(page.getByRole('heading', { name: 'run-typescript' })).toBeVisible()
})
