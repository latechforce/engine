import { expect, test } from '@/e2e/fixtures'

test('should return the admin tables page', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, loggedOnAdmin: true, filter: 'table/index' })

  // WHEN
  await page.goto('/admin/tables')

  // THEN
  await expect(page).toHaveScreenshot()
})

test('should list tables', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, loggedOnAdmin: true, filter: 'table/index' })

  // WHEN
  await page.goto('/admin/tables')

  // THEN
  await expect(page.getByText('Users')).toBeVisible()
  await expect(page.getByText('Posts')).toBeVisible()
})

test('should list table records', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, loggedOnAdmin: true, filter: 'table/index' })
  await page.request.post('/api/tables/Users', {
    data: {
      records: [
        { fields: { 'First name': 'John', 'Last name': 'Doe' } },
        { fields: { 'First name': 'Jane', 'Last name': 'Dae' } },
      ],
    },
  })

  // WHEN
  await page.goto('/admin/tables')

  // THEN
  await expect(page.getByText('John')).toBeVisible()
  await expect(page.getByText('Doe')).toBeVisible()
  await expect(page.getByText('Jane')).toBeVisible()
  await expect(page.getByText('Dae')).toBeVisible()
})

test('should search table records', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, loggedOnAdmin: true, filter: 'table/index' })
  await page.request.post('/api/tables/Users', {
    data: {
      records: [
        { fields: { 'First name': 'John', 'Last name': 'Doe' } },
        { fields: { 'First name': 'Jane', 'Last name': 'Dae' } },
      ],
    },
  })

  // WHEN
  await page.goto('/admin/tables')
  await page.getByPlaceholder('Search...').fill('John')

  // THEN
  await expect(page.getByText('John')).toBeVisible()
  await expect(page.getByText('Jane')).not.toBeVisible()
})

// TODO: [@thomas-jeanneau] - should open and display a table record
test.skip('should open and display a table record', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  await page.goto('/admin/tables')

  // THEN
})

// TODO: [@thomas-jeanneau] - should create a table record
test.skip('should create a table record', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  await page.goto('/admin/tables')

  // THEN
})

// TODO: [@thomas-jeanneau] - should update a table record
test.skip('should update a table record', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  await page.goto('/admin/tables')

  // THEN
})

// TODO: [@thomas-jeanneau] - should delete a table record
test.skip('should delete a table record', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test })

  // WHEN
  await page.goto('/admin/tables')

  // THEN
})
