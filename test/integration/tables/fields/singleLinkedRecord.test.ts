import Tester, { expect, describe, it } from 'bun:test'
import { IntegrationTest } from '@test/integration'
import { getFirstAndSecondTableConfig } from '@test/config'

new IntegrationTest(Tester).with({ drivers: ['Database'] }, ({ app, request, drivers }) => {
  describe('on start', () => {
    it('should create a table with a single linked record', async () => {
      // GIVEN
      const config = getFirstAndSecondTableConfig(['single_linked_record'])

      // WHEN
      const startedApp = await app.start(config)

      // THEN
      expect(startedApp).toBeDefined()
    })

    it('should migrate a table with existing single linked record dependancies', async () => {
      // GIVEN
      const config = getFirstAndSecondTableConfig(['name', 'single_linked_record'])
      const secondTable = drivers.database.table(config.tables[1])
      await secondTable.create()
      await secondTable.insertMany([
        { id: '1', fields: { name: 'Row 1' }, created_at: new Date() },
        { id: '2', fields: { name: 'Row 2' }, created_at: new Date() },
        { id: '3', fields: { name: 'Row 3' }, created_at: new Date() },
      ])
      const firstTable = drivers.database.table(config.tables[0])
      await firstTable.create()
      await firstTable.insertMany([
        {
          id: '1',
          fields: { name: 'Row 1', single_linked_record: '1' },
          created_at: new Date(),
        },
        { id: '2', fields: { name: 'Row 2', single_linked_record: '2' }, created_at: new Date() },
        { id: '3', fields: { name: 'Row 3', single_linked_record: '3' }, created_at: new Date() },
      ])

      // WHEN
      const startedApp = await app.start(config)

      // WHEN
      expect(startedApp).toBeDefined()
    })

    it('should migrate a table after editing SingleTextField to SingleLinkedRecord', async () => {
      // GIVEN
      const config = getFirstAndSecondTableConfig(['name', 'single_linked_record'])
      const firstTable = drivers.database.table({
        name: config.tables[0].name,
        fields: [
          { name: 'name', type: 'SingleLineText' },
          {
            name: 'single_linked_record',
            type: 'SingleLineText',
          },
        ],
      })
      await firstTable.create()
      const secondTable = drivers.database.table(config.tables[1])
      await secondTable.create()
      await secondTable.insert({ id: '1', fields: { name: 'Row 1' }, created_at: new Date() })

      // WHEN
      await app.start(config)

      // THEN
      await firstTable.insert({
        id: '1',
        fields: { name: 'Row 1', single_linked_record: '1' },
        created_at: new Date(),
      })
    })
  })

  describe('on POST', () => {
    it('should create a record with a single linked record', async () => {
      // GIVEN
      const config = getFirstAndSecondTableConfig(['name', 'single_linked_record'])
      const { url } = await app.start(config)
      await drivers.database
        .table(config.tables[1])
        .insert({ id: '1', fields: { name: 'Row 1' }, created_at: new Date() })

      // WHEN
      const { record } = await request.post(`${url}/api/table/${config.tables[0].name}`, {
        name: 'Row 1',
        single_linked_record: '1',
      })

      // THEN
      expect(record.fields.single_linked_record).toBe('1')
    })
  })
})
