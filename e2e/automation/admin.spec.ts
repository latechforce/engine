import { expect, test } from '@/e2e/fixtures'

test('should list automations', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'run-typescript', loggedOnAdmin: true })

  // WHEN
  await page.goto('/admin/automations')

  // THEN
  await expect(page.getByText('run-typescript')).toBeVisible()
  await expect(page.getByText('less than a minute ago')).toBeVisible()
})

// TODO: [@thomas-jeanneau] - should disable an automation
test('should disable an automation', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'typescript', loggedOnAdmin: true })

  // WHEN
  await page.goto('/admin/automations')

  // THEN
})

// TODO: [@thomas-jeanneau] - should enable an automation
test('should enable an automation', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'typescript', loggedOnAdmin: true })

  // WHEN
  await page.goto('/admin/automations')

  // THEN
})

test('should open on github', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, filter: 'typescript', loggedOnAdmin: true })

  // WHEN
  await page.goto('/admin/automations')

  // THEN
})
