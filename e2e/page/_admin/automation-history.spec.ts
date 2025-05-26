import { test } from '@/e2e/fixtures'

// TODO: [@kermitsxb] - should search and display an automation run
test.skip('should search and display an automation run', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  await page.goto('/_admin/automation/history')

  // THEN
})
