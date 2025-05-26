import { test } from '@/e2e/fixtures'

// TODO: [@kermitsxb] - should search and display an automation run
test.skip('should search and display automation runs', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  await page.goto('/_admin/automation/history')

  // THEN
})

// TODO: [@kermitsxb] - should select and replay failed automation runs
test.skip('should select and replay failed automation runs', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  await page.goto('/_admin/automation/history')

  // THEN
})

// TODO: [@kermitsxb] - should display an automation run
// It should display the automation run details in a modal when clicking on a run
// This modal should not be specific to the automation history page, but its the behaviour of the table component
// The searched UX is the same that Airtable
test.skip('should open and display an automation run', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  await page.goto('/_admin/automation/history')

  // THEN
})
