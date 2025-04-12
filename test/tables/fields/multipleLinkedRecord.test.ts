import Tester, { expect, describe, it } from 'bun:test'
import { Mock } from '/test/bun'
import { getFirstAndSecondTableSchema } from '/test/common'

const mock = new Mock(Tester, { drivers: ['Database'] })

mock.request(({ app, request, drivers }) => {
  describe('on start', () => {
    it('should create a table with a multiple linked record', async () => {
      // GIVEN
      const config = getFirstAndSecondTableSchema(['multiple_linked_record'])

      // WHEN
      const startedApp = await app.start(config)

      // THEN
      expect(startedApp).toBeDefined()
    })

    it('should restart an app with a multiple linked record', async () => {
      // GIVEN
      const config = getFirstAndSecondTableSchema(['multiple_linked_record'])
      const startedApp = await app.start(config)
      await startedApp.stop()

      // WHEN
      await app.start(config)
    })
  })

  describe('on POST', () => {
    it('should create a record with a multiple linked record', async () => {
      // GIVEN
      const config = getFirstAndSecondTableSchema(['name', 'multiple_linked_record'])
      const { url } = await app.start(config)
      await drivers.database.tableFromSchema(config.tables[1]).insertMany([
        { id: '1', fields: { name: 'Row 1' }, created_at: new Date().toISOString() },
        { id: '2', fields: { name: 'Row 2' }, created_at: new Date().toISOString() },
      ])

      // WHEN
      const { record } = await request.post(`${url}/api/table/${config.tables[0].name}`, {
        name: 'Row 1',
        multiple_linked_record: ['1', '2'],
      })

      // THEN
      expect(record.fields.multiple_linked_record).toStrictEqual(['1', '2'])
    })

    it('should not create a record with a bad multiple linked record id', async () => {
      // GIVEN
      const config = getFirstAndSecondTableSchema(['name', 'multiple_linked_record'])
      const { url } = await app.start(config)
      await drivers.database.tableFromSchema(config.tables[1]).insertMany([
        { id: '1', fields: { name: 'Row 1' }, created_at: new Date().toISOString() },
        { id: '2', fields: { name: 'Row 2' }, created_at: new Date().toISOString() },
      ])

      // WHEN
      const { error } = await request.post(`${url}/api/table/${config.tables[0].name}`, {
        name: 'Row 1',
        multiple_linked_record: ['1', '3'],
      })

      // THEN
      expect(error).toStrictEqual({
        message: 'Invalid linked record',
      })
    })

    it.skip('should create a record with a multiple linked record field to the same table', async () => {
      // GIVEN
      const config = getFirstAndSecondTableSchema(['multiple_linked_record'])
      const { url } = await app.start(config)
      await drivers.database.tableFromSchema(config.tables[1]).insertMany([
        { id: '1', fields: { name: 'Row 1' }, created_at: new Date().toISOString() },
        { id: '2', fields: { name: 'Row 2' }, created_at: new Date().toISOString() },
        { id: '3', fields: { name: 'Row 3' }, created_at: new Date().toISOString() },
      ])

      // WHEN
      const { record } = await request.post(`${url}/api/table/${config.tables[0].name}`, {
        multiple_linked_record: ['2', '3'],
      })

      // THEN
      expect(record.fields.multiple_linked_record).toStrictEqual(['1', '2'])
    })
  })
})
