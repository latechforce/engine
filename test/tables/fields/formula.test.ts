import Tester, { expect, describe, it } from 'bun:test'
import { Mock } from '/test/bun'
import { getFirstTableSchema } from '/test/common'

const mock = new Mock(Tester, { drivers: ['Database'] })

mock.request(({ app, request, drivers }) => {
  describe('on start', () => {
    it('should create a table with a text formula', async () => {
      // GIVEN
      const config = getFirstTableSchema(['name', 'text_formula'])

      // WHEN
      const startedApp = await app.start(config)

      // THEN
      expect(startedApp).toBeDefined()
    })

    it('should create a table with a number formula', async () => {
      // GIVEN
      const config = getFirstTableSchema(['number', 'number_formula'])

      // WHEN
      const startedApp = await app.start(config)

      // THEN
      expect(startedApp).toBeDefined()
    })

    it('should migrate a table with a new formula', async () => {
      // GIVEN
      const config = getFirstTableSchema(['name', 'text_formula'])
      await drivers.database.tableFromSchema(getFirstTableSchema(['name']).tables[0]).create()

      // WHEN
      const { url } = await app.start(config)
      const { record } = await request.post(`${url}/api/table/${config.tables[0].name}`, {
        name: 'John',
      })

      // THEN
      expect(record.fields.text_formula).toBe('Hello John')
    })

    it('should migrate a table with an updated formula', async () => {
      // GIVEN
      const config = getFirstTableSchema(['name', 'text_formula'])
      await drivers.database
        .table({
          name: config.tables[0].name,
          fields: [
            { name: 'name', type: 'SingleLineText' },
            {
              name: 'text_formula',
              type: 'Formula',
              formula: "'Bonjour ' || name",
              output: { type: 'SingleLineText' },
            },
          ],
        })
        .create()
      const { url } = await app.start(config)

      // WHEN
      const { record } = await request.post(`${url}/api/table/${config.tables[0].name}`, {
        name: 'John',
      })

      // THEN
      expect(record.fields.text_formula).toBe('Hello John')
    })
  })

  describe('on POST', () => {
    it('should create a record with a text formula', async () => {
      // GIVEN
      const config = getFirstTableSchema(['name', 'text_formula'])
      const { url } = await app.start(config)

      // WHEN
      const { record } = await request.post(`${url}/api/table/${config.tables[0].name}`, {
        name: 'John',
      })

      // THEN
      expect(record.fields.text_formula).toBe('Hello John')
    })

    it('should create a record with a number formula', async () => {
      // GIVEN
      const config = getFirstTableSchema(['number', 'number_formula'])
      const { url } = await app.start(config)

      // WHEN
      const { record } = await request.post(`${url}/api/table/${config.tables[0].name}`, {
        number: 10,
      })

      // THEN
      expect(record.fields.number_formula).toBe(100)
    })

    it('should create a record with a text formula referencing another text formula', async () => {
      // GIVEN
      const config = getFirstTableSchema(['name', 'text_formula', 'text_formula_reference'])
      const { url } = await app.start(config)

      // WHEN
      const { record } = await request.post(`${url}/api/table/${config.tables[0].name}`, {
        name: 'John',
      })

      // THEN
      expect(record.fields.text_formula_reference).toBe('Hello John!')
    })

    it('should create a record with a number formula referencing another number formula', async () => {
      // GIVEN
      const config = getFirstTableSchema(['number', 'number_formula', 'number_formula_reference'])
      const { url } = await app.start(config)

      // WHEN
      const { record } = await request.post(`${url}/api/table/${config.tables[0].name}`, {
        number: 10,
      })

      // THEN
      expect(record.fields.number_formula_reference).toBe(1000)
    })
  })
})
