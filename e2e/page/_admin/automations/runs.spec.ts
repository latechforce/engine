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
