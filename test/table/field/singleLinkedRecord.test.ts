import Tester, { expect, describe, it } from 'bun:test'
import { Mock } from '/test/bun'
import { configTableFieldSingleLinkedRecord } from '/examples/config/table/field/singleLinkedRecord'

const mock = new Mock(Tester, { drivers: ['Database'] })

mock.request(({ app, request, drivers }) => {
  describe('on start', () => {
    it('should create a table with a single linked record', async () => {
      // WHEN
      const call = () => app.start(configTableFieldSingleLinkedRecord)

      // THEN
      expect(call()).resolves.toBeDefined()
    })

    it('should migrate a table with existing single linked records', async () => {
      // GIVEN
      const secondTable = drivers.database.tableFromSchema(
        configTableFieldSingleLinkedRecord.tables![1]
      )
      await secondTable.create()
      await secondTable.insertMany([
        { id: '1', fields: {}, created_at: new Date().toISOString() },
        { id: '2', fields: {}, created_at: new Date().toISOString() },
        { id: '3', fields: {}, created_at: new Date().toISOString() },
      ])
      const firstTable = drivers.database.tableFromSchema(
        configTableFieldSingleLinkedRecord.tables![0]
      )
      await firstTable.create()
      await firstTable.insertMany([
        {
          id: '1',
          fields: { single_linked_record: '1' },
          created_at: new Date().toISOString(),
        },
        {
          id: '2',
          fields: { single_linked_record: '2' },
          created_at: new Date().toISOString(),
        },
        {
          id: '3',
          fields: { single_linked_record: '3' },
          created_at: new Date().toISOString(),
        },
      ])

      // WHEN
      const call = () => app.start(configTableFieldSingleLinkedRecord)

      // THEN
      expect(call()).resolves.toBeDefined()
    })
  })

  describe('on POST', () => {
    it('should create a record with a single linked record', async () => {
      // GIVEN
      const { url } = await app.start(configTableFieldSingleLinkedRecord)
      await drivers.database.tableFromSchema(configTableFieldSingleLinkedRecord.tables![1]).insert({
        id: '1',
        fields: {},
        created_at: new Date().toISOString(),
      })

      // WHEN
      const { record } = await request.post(
        `${url}/api/table/${configTableFieldSingleLinkedRecord.tables![0].name}`,
        {
          single_linked_record: '1',
        }
      )

      // THEN
      expect(record.fields.single_linked_record).toBe('1')
    })
  })
})
