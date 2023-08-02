import { test, expect } from './fixtures'

test.describe('An api that allow CRUD operations on invoices', () => {
  test.skip('should create a list of rows', async ({ request, orm, faker }) => {
    // GIVEN
    // We create 2 invoices
    const invoices = faker.generate('invoices', 2)

    // WHEN
    // I make a POST request with 2 invoices
    const res = await request.post('/api/table/invoices', { data: invoices })

    // THEN
    // I have created 2 invoices
    expect(res.status()).toEqual(200)
    const rows = await orm.invoice.findMany({})
    for (let i = 0; i > rows.length; i++) {
      expect(rows[i].id).toBeDefined()
      expect(rows[i].created_at).toBeDefined()
    }
  })

  test('should read a list of rows from a list of ids', async ({ request, orm, faker }) => {
    // GIVEN
    // We provide 3 invoices and we get only 2 ids
    const invoices = faker.generate('invoices', 3)
    const ids = []
    for (let i = 0; i < invoices.length; i++) {
      const data = { ...invoices[i], items: { create: invoices[i].items } }
      invoices[i] = await orm.invoice.create({ data })
      if (i < invoices.length - 1) ids.push(invoices[i].id)
    }

    // WHEN
    // I make a GET request on table invoices
    const res = await request.get(
      `/api/table/invoices?filter_key_0=id&filter_operator_0=is_any_of&filter_value_0=${ids.join(
        ','
      )}`
    )

    // THEN
    // I have read 2 invoices
    expect(res.status()).toEqual(200)
    const rows = await res.json()
    expect(rows.length).toEqual(2)
    expect(rows[0].id).toEqual(invoices[0].id)
    expect(rows[1].id).toEqual(invoices[1].id)
  })

  test('should update a row', async ({ request, orm, faker }) => {
    // GIVEN
    // We provide an invoice
    const [invoice] = faker.generate('invoices', 1)
    const data = { ...invoice, items: { create: invoice.items } }
    const row = await orm.invoice.create({ data })

    // WHEN
    // I make a PATCH request to update this invoice
    const update = {
      customer: faker.company.name(),
    }
    const res = await request.patch(`/api/table/invoices/${row.id}`, {
      data: update,
    })

    // THEN
    // The updated invocie should have a new name
    expect(res.status()).toEqual(200)
    const updatedRow = await orm.invoice.findUniqueOrThrow({ where: { id: row.id } })
    expect(updatedRow.id).toEqual(row.id)
    expect(updatedRow.customer).toEqual(update.customer)
    expect(updatedRow.updated_at).toBeDefined()
  })

  test('should soft delete a row', async ({ request, orm, faker }) => {
    // GIVEN
    // We provide an invoice
    const [invoice] = faker.generate('invoices', 1)
    const data = { ...invoice, items: { create: invoice.items } }
    const row = await orm.invoice.create({ data })

    // WHEN
    // I make a DELETE request to soft delete this invoice
    const res = await request.delete(`/api/table/invoices/${row.id}`)

    // THEN
    // I should have a deleted_at value on my soft deleted invoice
    expect(res.status()).toEqual(200)
    const deletedRow = await orm.invoice.findUniqueOrThrow({ where: { id: row.id } })
    expect(deletedRow.id).toEqual(row.id)
    expect(deletedRow.deleted_at).toBeDefined()
  })
})

test.describe('An api that render error messages', () => {
  test('should return a 404 error when the table does not exist', async ({ request }) => {
    // WHEN
    // I make a GET request on an unknown table
    const res = await request.get('/api/table/unknown')

    // THEN
    // I should have a 404 error
    expect(res.status()).toEqual(404)
    expect((await res.json()).error).toEqual('Table unknown does not exist')
  })

  test('should return a 404 error when the row does not exist', async ({ request }) => {
    // WHEN
    // I make a GET request on an unknown row
    const res = await request.get('/api/table/invoices/unknown')

    // THEN
    // I should have a 404 error
    expect(res.status()).toEqual(404)
    expect((await res.json()).error).toEqual('Row unknown does not exist in table invoices')
  })

  test('should return a 400 error when the row is not valid', async ({ request }) => {
    // WHEN
    // I make a POST request with an invalid row
    const res = await request.post('/api/table/invoices', { data: { invalid: 'invalid' } })

    // THEN
    // I should have a 400 error
    expect(res.status()).toEqual(400)
    const { error, details } = await res.json()
    expect(error).toEqual('Invalid row')
    expect(details).toContain('Invalid fields: invalid')
  })
})