import { test } from '@/e2e/fixtures'

// TODO: [@thomas-jeanneau] - should list forms
test.skip('should list forms', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  await page.goto('/_admin/forms')

  // THEN
})
