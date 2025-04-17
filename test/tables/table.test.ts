import Tester, { expect, describe, it } from 'bun:test'
import { Mock, type Config } from '/test/bun'
import { getFirstTableSchema } from '/test/common'
import withSingleLineText from '../../examples/config/table/with-single-line-text'

const mock = new Mock(Tester, { drivers: ['Database'] })

mock.request(({ app, request, drivers }) => {
  describe('on start', () => {
    it('should create a table', async () => {
      // WHEN
      await app.start(withSingleLineText)

      // THEN
      const table = drivers.database.tableFromSchema(withSingleLineText.tables![0])
      expect(table.exists()).resolves.toBe(true)
    })

    it('should connect to an existing table', async () => {
      // GIVEN
      await drivers.database.tableFromSchema(withSingleLineText.tables![0]).create()

      // WHEN
      const startedApp = await app.start(withSingleLineText)

      // THEN
      expect(startedApp).toBeDefined()
    })

    it('should migrate an existing table with a new field', async () => {
      // GIVEN
      await drivers.database.tableFromSchema(withSingleLineText.tables![0]).create()
      const newConfig: Config = { ...withSingleLineText }
      newConfig.tables?.[0].fields.push({ name: 'new_field', type: 'SingleLineText' })

      // WHEN
      const startedApp = await app.start(newConfig)

      // THEN
      expect(startedApp).toBeDefined()
    })

    it('should migrate a table with existing records', async () => {
      // GIVEN
      const config = getFirstTableSchema()
      const table = drivers.database.tableFromSchema(config.tables[0])
      await table.create()
      await table.insertMany([
        { id: '1', fields: { name: 'John' }, created_at: new Date().toISOString() },
        { id: '2', fields: { name: 'Paul' }, created_at: new Date().toISOString() },
        { id: '3', fields: { name: 'Ringo' }, created_at: new Date().toISOString() },
      ])

      // WHEN
      await app.start(config)

      // THEN
      const records = await table.list()
      expect(records).toHaveLength(3)
      expect(records[0].fields.name).toBe('John')
    })
  })

  describe('on POST', () => {
    it('should return an error if table does not exist', async () => {
      // GIVEN
      const config = getFirstTableSchema()
      const { url } = await app.start(config)

      // WHEN
      const response = await request.post(`${url}/api/table/unknown`, {
        name: 'John',
      })

      // THEN
      expect(response.error).toBe('Table "unknown" not found')
    })

    it('should create a record in database when posting on table api', async () => {
      // GIVEN
      const config = getFirstTableSchema()
      const { url } = await app.start(config)

      // WHEN
      await request.post(`${url}/api/table/${config.tables[0].name}`, {
        name: 'John',
      })

      // THEN
      const record = await drivers.database
        .tableFromSchema(config.tables[0])
        .read({ field: 'name', operator: 'Is', value: 'John' })
      expect(record).toBeDefined()
      expect(record!.id).toBeDefined()
      expect(record!.fields.name).toBe('John')
    })

    it('should get a created record when posting on table api', async () => {
      // GIVEN
      const config = getFirstTableSchema()
      const { url } = await app.start(config)

      // WHEN
      const { record } = await request.post(`${url}/api/table/${config.tables[0].name}`, {
        name: 'John',
      })

      // THEN
      expect(record).toBeDefined()
      expect(record.id).toBeDefined()
      expect(record.fields.name).toBe('John')
    })

    it('should create a record with an id with a length of 27', async () => {
      // GIVEN
      const config = getFirstTableSchema()
      const { url } = await app.start(config)

      // WHEN
      await request.post(`${url}/api/table/${config.tables[0].name}`, {
        name: 'John',
      })

      // THEN
      const record = await drivers.database
        .tableFromSchema(config.tables[0])
        .read({ field: 'name', operator: 'Is', value: 'John' })
      expect(record).toBeDefined()
      expect(record!.id).toHaveLength(27)
    })

    it('should create a record with a date field', async () => {
      // GIVEN
      const config = getFirstTableSchema(['date'])
      const { url } = await app.start(config)
      const date = new Date().toISOString()

      // WHEN
      const { record } = await request.post(`${url}/api/table/${config.tables[0].name}`, {
        date,
      })

      // THEN
      expect(record.fields.date).toBe(date)
    })
  })
})
