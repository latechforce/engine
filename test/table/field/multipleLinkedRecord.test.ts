import Tester, { expect, describe, it } from 'bun:test'
import { Mock } from '/test/bun'
import { multipleLinkedRecord } from '/examples/config/table/field/type/multipleLinkedRecord'

const mock = new Mock(Tester, { drivers: ['Database'] })

mock.request(({ app, request, drivers }) => {
  describe('on app start', () => {
    it('should create a table with a multiple linked record', async () => {
      // WHEN
      const call = () => app.start(multipleLinkedRecord)

      // THEN
      expect(call()).resolves.toBeDefined()
    })

    it('should restart an app with a multiple linked record', async () => {
      // GIVEN
      const startedApp = await app.start(multipleLinkedRecord)
      await startedApp.stop()

      // WHEN
      const call = () => app.start(multipleLinkedRecord)

      // THEN
      expect(call()).resolves.toBeDefined()
    })
  })

  describe('on API POST', () => {
    it('should create a record with a multiple linked record', async () => {
      // GIVEN
      const { url } = await app.start(multipleLinkedRecord)
      await drivers.database.tableFromSchema(multipleLinkedRecord.tables![1]).insertMany([
        { id: '1', fields: {}, created_at: new Date().toISOString() },
        { id: '2', fields: {}, created_at: new Date().toISOString() },
      ])

      // WHEN
      const { record } = await request.post(
        `${url}/api/table/${multipleLinkedRecord.tables![0].name}`,
        {
          multiple_linked_record: ['1', '2'],
        }
      )

      // THEN
      expect(record.fields.multiple_linked_record).toStrictEqual(['1', '2'])
    })

    it('should not create a record with a bad multiple linked record id', async () => {
      // GIVEN
      const { url } = await app.start(multipleLinkedRecord)
      await drivers.database.tableFromSchema(multipleLinkedRecord.tables![1]).insertMany([
        { id: '1', fields: {}, created_at: new Date().toISOString() },
        { id: '2', fields: {}, created_at: new Date().toISOString() },
      ])

      // WHEN
      const response = await request.post(
        `${url}/api/table/${multipleLinkedRecord.tables![0].name}`,
        {
          multiple_linked_record: ['1', '3'],
        }
      )

      // THEN
      expect(response.error).toBe('Invalid linked record')
    })
  })
})
