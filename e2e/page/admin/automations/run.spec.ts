import { test } from '@/e2e/fixtures'

// TODO: [@kermitsxb] - should display the details of an automation run
test.skip('should open and display an automation run', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  await page.goto('/admin/automation/history/1')

  // THEN
})
