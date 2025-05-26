import { test } from '@/e2e/fixtures'

// TODO: [@thomas-jeanneau] - should list tables
test.skip('should list tables', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  await page.goto('/_admin/tables')

  // THEN
})

// TODO: [@thomas-jeanneau] - should list table records
test.skip('should list table records', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  await page.goto('/_admin/tables')

  // THEN
})

// TODO: [@thomas-jeanneau] - should search table records
test.skip('should search table records', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  await page.goto('/_admin/tables')

  // THEN
})

// TODO: [@thomas-jeanneau] - should open and display a table record
test.skip('should open and display a table record', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  await page.goto('/_admin/tables')

  // THEN
})

// TODO: [@thomas-jeanneau] - should create a table record
test.skip('should create a table record', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  await page.goto('/_admin/tables')

  // THEN
})

// TODO: [@thomas-jeanneau] - should update a table record
test.skip('should update a table record', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  await page.goto('/_admin/tables')

  // THEN
})

// TODO: [@thomas-jeanneau] - should delete a table record
test.skip('should delete a table record', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  await page.goto('/_admin/tables')

  // THEN
})
