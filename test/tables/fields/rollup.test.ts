import Tester, { expect, describe, it } from 'bun:test'
import { Helpers } from '/test/bun'
import { getFirstAndSecondTableConfig } from '/test/config'

const helpers = new Helpers(Tester)

helpers.testWithMockedApp({ drivers: ['Database'] }, ({ app, request, drivers }) => {
  describe('on start', () => {
    it('should create a table with a text rollup', async () => {
      // GIVEN
      const config = getFirstAndSecondTableConfig(['multiple_linked_record', 'text_rollup'])

      // WHEN
      const startedApp = await app.start(config)

      // THEN
      expect(startedApp).toBeDefined()
    })

    it('should create a table with a number rollup', async () => {
      // GIVEN
      const config = getFirstAndSecondTableConfig(['multiple_linked_record', 'number_rollup'])

      // WHEN
      const startedApp = await app.start(config)

      // THEN
      expect(startedApp).toBeDefined()
    })
  })

  describe('on POST', () => {
    it.only('should create a record with a rollup as a number', async () => {
      // GIVEN
      const config = getFirstAndSecondTableConfig(['multiple_linked_record', 'number_rollup'])
      const { url } = await app.start(config)
      await drivers.database.table(config.tables[1]).insertMany([
        { id: '1', fields: { number: 5 }, created_at: new Date().toISOString() },
        { id: '2', fields: { number: 5 }, created_at: new Date().toISOString() },
      ])

      // WHEN
      const { record } = await request.post(`${url}/api/table/${config.tables[0].name}`, {
        multiple_linked_record: ['1', '2'],
      })

      // THEN
      expect(record.fields.number_rollup).toBe(10)
    })

    it('should create a record with a rollup as a text', async () => {
      // GIVEN
      const config = getFirstAndSecondTableConfig(['multiple_linked_record', 'text_rollup'])
      const { url } = await app.start(config)
      await drivers.database.table(config.tables[1]).insertMany([
        { id: '1', fields: { name: 'John' }, created_at: new Date().toISOString() },
        { id: '2', fields: { name: 'Jean' }, created_at: new Date().toISOString() },
      ])

      // WHEN
      const { record } = await request.post(`${url}/api/table/${config.tables[0].name}`, {
        multiple_linked_record: ['1', '2'],
      })

      // THEN
      expect(record.fields.text_rollup).toBe('John, Jean')
    })

    it('should create a record with multiple rollups', async () => {
      // GIVEN
      const config = getFirstAndSecondTableConfig([
        'multiple_linked_record',
        'text_rollup',
        'number_rollup',
      ])
      const { url } = await app.start(config)
      await drivers.database.table(config.tables[1]).insertMany([
        {
          id: '1',
          fields: { name: 'Row 1', number: 5 },
          created_at: new Date().toISOString(),
        },
        {
          id: '2',
          fields: { name: 'Row 2', number: 5 },
          created_at: new Date().toISOString(),
        },
      ])

      // WHEN
      const { record } = await request.post(`${url}/api/table/${config.tables[0].name}`, {
        multiple_linked_record: ['1', '2'],
      })

      // THEN
      expect(record.fields.text_rollup).toBe('Row 1, Row 2')
      expect(record.fields.number_rollup).toBe(10)
    })
  })
})
