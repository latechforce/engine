import Tester, { expect, describe, it } from 'bun:test'
import { Mock } from '/test/bun'
import { getFirstTableConfig } from '/test/config'

const mock = new Mock(Tester, { drivers: ['Database'] })

mock.request(({ app, request, drivers }) => {
  describe('on start', () => {
    it('should create a table', async () => {
      // GIVEN
      const config = getFirstTableConfig()

      // WHEN
      await app.start(config)

      // THEN
      expect(drivers.database.table(config.tables[0]).exists()).resolves.toBe(true)
    })

    it('should connect to an existing table', async () => {
      // GIVEN
      const config = getFirstTableConfig()
      await drivers.database.table(config.tables[0]).create()

      // WHEN
      const startedApp = await app.start(config)

      // THEN
      expect(startedApp).toBeDefined()
    })

    it('should migrate an existing table with a new field', async () => {
      // GIVEN
      const config = getFirstTableConfig(['name', 'long_text'])
      await drivers.database.table(getFirstTableConfig(['name']).tables[0]).create()

      // WHEN
      const startedApp = await app.start(config)

      // THEN
      expect(startedApp).toBeDefined()
    })

    it('should migrate a table with a renamed field', async () => {
      // GIVEN
      const config = getFirstTableConfig(['name_after_migration'])
      const table = drivers.database.table(getFirstTableConfig(['name_before_migration']).tables[0])
      await table.create()
      await table.insert({
        id: '1',
        fields: { name_before_migration: 'test' },
        created_at: new Date().toISOString(),
      })

      // WHEN
      await app.start(config)

      // THEN
      const record = await drivers.database.table(config.tables[0]).readById('1')
      expect(record?.fields.name_after_migration).toBe('test')
      expect(record?.fields.name_before_migration).toBeUndefined()
    })

    it('should migrate a table with a renamed field that has already be renamed', async () => {
      // GIVEN
      const config = getFirstTableConfig(['name_after_migration'])
      const table = drivers.database.table(config.tables[0])
      await table.create()
      await table.insert({
        id: '1',
        fields: { name_after_migration: 'test' },
        created_at: new Date().toISOString(),
      })

      // WHEN
      const call = () => app.start(config)

      // THEN
      expect(call()).resolves.toBeDefined()
    })

    it('should migrate a table with existing records', async () => {
      // GIVEN
      const config = getFirstTableConfig()
      const table = drivers.database.table(config.tables[0])
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
      const config = getFirstTableConfig()
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
      const config = getFirstTableConfig()
      const { url } = await app.start(config)

      // WHEN
      await request.post(`${url}/api/table/${config.tables[0].name}`, {
        name: 'John',
      })

      // THEN
      const record = await drivers.database
        .table(config.tables[0])
        .read({ field: 'name', operator: 'Is', value: 'John' })
      expect(record).toBeDefined()
      expect(record!.id).toBeDefined()
      expect(record!.fields.name).toBe('John')
    })

    it('should get a created record when posting on table api', async () => {
      // GIVEN
      const config = getFirstTableConfig()
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

    it('should create a record with an id with a length of 24', async () => {
      // GIVEN
      const config = getFirstTableConfig()
      const { url } = await app.start(config)

      // WHEN
      await request.post(`${url}/api/table/${config.tables[0].name}`, {
        name: 'John',
      })

      // THEN
      const record = await drivers.database
        .table(config.tables[0])
        .read({ field: 'name', operator: 'Is', value: 'John' })
      expect(record).toBeDefined()
      expect(record!.id).toHaveLength(24)
    })

    it('should create a record with a date field', async () => {
      // GIVEN
      const config = getFirstTableConfig(['date'])
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
