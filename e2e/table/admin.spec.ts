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
  await expect(page.locator('a').filter({ hasText: 'Users' })).toBeVisible()
  await expect(page.locator('a').filter({ hasText: 'Posts' })).toBeVisible()
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
  await page.getByRole('cell', { name: '1.' }).getByRole('link').click()
  await page.waitForURL(`/admin/tables/1/records/${recordId}`)

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
  await page.waitForURL('/admin/tables/1/record/new')
  await page.getByRole('textbox', { name: 'First name' }).fill('John')
  await page.getByRole('textbox', { name: 'Last name' }).fill('Doe')
  await page.getByRole('button', { name: 'Create' }).click()
  await page.waitForURL('/admin/tables/1/records/*')

  // THEN
  await expect(page.getByText('Record created successfully')).toBeVisible()
  await expect(page.getByRole('heading', { name: 'John' })).toBeVisible()
})

test('should create a table record with required fields', async ({ startExampleApp }) => {
  // GIVEN
  const { page } = await startExampleApp({ test, loggedOnAdmin: true, filter: 'table/required' })

  // WHEN
  await page.goto('/admin/tables')
  await page.getByRole('button', { name: 'Create' }).click()
  await page.waitForURL('/admin/tables/1/record/new')
  await page.getByRole('textbox', { name: 'First name' }).fill('John')
  await page.getByRole('textbox', { name: 'Last name' }).fill('Doe')
  await page.getByRole('button', { name: 'Create' }).click()
  await page.waitForURL('/admin/tables/1/records/*')

  // THEN
  await expect(page.getByText('Record created successfully')).toBeVisible()
  await expect(page.getByRole('heading', { name: 'John' })).toBeVisible()
})

test('should update a table record', async ({ startExampleApp }) => {
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
  await page.getByRole('cell', { name: '1.' }).getByRole('link').click()
  await page.waitForURL(`/admin/tables/1/records/${recordId}`)
  await page.getByRole('textbox', { name: 'First name' }).fill('Jane')
  await page.getByRole('textbox', { name: 'Last name' }).fill('Dae')
  await page.getByRole('button', { name: 'Update' }).click()

  // THEN
  await expect(page.getByRole('heading', { name: 'Jane' })).toBeVisible()
  const lastName = await page.getByRole('textbox', { name: 'Last name' }).inputValue()
  expect(lastName).toBe('Dae')
  await page.goto('/admin/tables')
  await expect(page.getByText('John')).not.toBeVisible()
  await expect(page.getByText('Jane')).toBeVisible()
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
