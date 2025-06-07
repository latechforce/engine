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
  await expect(page.getByRole('tab', { name: 'Users' })).toBeVisible()
  await expect(page.getByRole('tab', { name: 'Posts' })).toBeVisible()
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

test('should open and display a table record', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, loggedOnAdmin: true, filter: 'table/index' })
  const response = await page.request.post('/api/tables/1', {
    data: {
      records: [{ fields: { 'First name': 'John', 'Last name': 'Doe' } }],
    },
  })
  const recordId = (await response.json()).records[0].id

  // WHEN
  await page.goto('/admin/tables')
  await page.getByRole('row', { name: 'Select row John Doe' }).getByRole('link').click()
  await page.waitForURL(`/admin/tables/1/${recordId}`)

  // THEN
  await expect(page.getByRole('heading', { name: 'John' })).toBeVisible()
  const lastName = await page.getByRole('textbox', { name: 'Last name' }).inputValue()
  expect(lastName).toBe('Doe')
})

test('should create a table record', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, loggedOnAdmin: true, filter: 'table/index' })

  // WHEN
  await page.goto('/admin/tables')
  await page.getByRole('button', { name: 'Create' }).click()
  await page.waitForSelector('text=Record without name')

  // THEN
  await expect(page.getByRole('heading', { name: 'Record without name' })).toBeVisible()
})

test('should update a table record', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, loggedOnAdmin: true, filter: 'table/index' })

  // WHEN
  await page.goto('/admin/tables')
  await page.getByRole('button', { name: 'Create' }).click()
  await page.waitForSelector('text=Record without name')
  await page.getByRole('textbox', { name: 'First name' }).fill('John')
  await page.getByRole('textbox', { name: 'Last name' }).fill('Doe')
  await page.getByRole('button', { name: 'Update' }).click()

  // THEN
  await expect(page.getByRole('heading', { name: 'John' })).toBeVisible()
  const lastName = await page.getByRole('textbox', { name: 'Last name' }).inputValue()
  expect(lastName).toBe('Doe')
  await page.goto('/admin/tables')
  await expect(page.getByText('John')).toBeVisible()
  await expect(page.getByText('Doe')).toBeVisible()
})

test('should delete a table record', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, loggedOnAdmin: true, filter: 'table/index' })
  await page.request.post('/api/tables/1', {
    data: {
      records: [{ fields: { 'First name': 'John', 'Last name': 'Doe' } }],
    },
  })

  // WHEN
  await page.goto('/admin/tables')
  await page.getByRole('cell', { name: 'Select row' }).click()
  await page.getByRole('button', { name: 'Actions' }).click()
  await page.getByRole('menuitem', { name: 'Delete' }).click()
  await page.waitForSelector('text=1 records deleted')

  // THEN
  await expect(page.getByText('John')).not.toBeVisible()
})
