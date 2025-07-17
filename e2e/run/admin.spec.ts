import { expect, test } from '@/e2e/fixtures'

test('should search and filter automation runs', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'run-typescript', loggedOnAdmin: true })
  await page.request.post('/api/automations/run-typescript')

  // WHEN
  await page.goto('/admin/automation-history')
  await page.getByRole('textbox', { name: 'Search' }).fill('run-typescript')

  // THEN
  await expect(page.getByRole('row', { name: 'run-typescript' })).toBeVisible()
  await page.getByRole('textbox', { name: 'Search' }).fill('invalid')
  await expect(page.getByText('No results.')).toBeVisible()
})

test('should search and filter automation runs based on steps data', async ({
  startExampleApp,
}) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'run-typescript', loggedOnAdmin: true })
  await page.request.post('/api/automations/run-typescript')

  // WHEN
  await page.goto('/admin/automation-history')
  await page.getByRole('textbox', { name: 'Search' }).fill('Hello, world!')

  // THEN
  await expect(page.getByRole('row', { name: 'run-typescript' })).toBeVisible()
  await page.getByRole('textbox', { name: 'Search' }).fill('invalid')
  await expect(page.getByText('No results.')).toBeVisible()
})

test('should select and replay failed automation runs', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({
    test,
    filter: 'automation/multiple',
    loggedOnAdmin: true,
  })
  await page.request.post('/api/automations/run-success')
  await page.request.post('/api/automations/run-failure')
  await page.request.post('/api/automations/run-failure')

  // WHEN
  await page.goto('/admin/automation-history')
  await page.waitForSelector('text=Replay run(s)')
  await page.getByRole('checkbox', { name: 'Select all' }).click()
  await page.getByRole('button', { name: 'Replay run(s)' }).click()
  await page.waitForSelector('text=2 runs replayed')

  // THEN
  await expect(page.getByText('2 runs replayed')).toBeVisible()
})

test('should open and display an automation run', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'run-typescript', loggedOnAdmin: true })
  const response = await page.request.post('/api/automations/run-typescript')
  const { runId } = await response.json()

  // WHEN
  await page.goto('/admin/automation-history')
  await page.getByRole('row', { name: 'run-typescript' }).click()
  await page.waitForURL(`/admin/automations/1/runs/${runId}`)

  // THEN
  await expect(page.getByRole('heading', { name: 'run-typescript' })).toBeVisible()
})
