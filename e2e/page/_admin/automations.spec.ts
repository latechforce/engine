import { test } from '@/e2e/fixtures'

// TODO: [@thomas-jeanneau] - should list automations
test.skip('should list automations', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  await page.goto('/_admin/automations')

  // THEN
})

// TODO: [@thomas-jeanneau] - should disable an automation
test.skip('should disable an automation', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  await page.goto('/_admin/automations')

  // THEN
})

// TODO: [@thomas-jeanneau] - should enable an automation
test.skip('should enable an automation', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  await page.goto('/_admin/automations')

  // THEN
})
