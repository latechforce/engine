import Tester, { expect, describe, it } from 'bun:test'
import { Mock, type Config } from '/test/bun'
import { singleLineText } from '/examples/config/table/field/singleLineText'

const mock = new Mock(Tester, { drivers: ['Database'] })

mock.app(({ app, drivers }) => {
  describe('on app start', () => {
    it('should migrate an existing table with a new field', async () => {
      // GIVEN
      await drivers.database.tableFromSchema(singleLineText.tables![0]).create()
      const newConfig: Config = {
        ...singleLineText,
        tables: [
          {
            ...singleLineText.tables![0],
            fields: [
              ...singleLineText.tables![0].fields!,
              { name: 'new_field', type: 'SingleLineText' },
            ],
          },
        ],
      }

      // WHEN
      const call = () => app.start(newConfig)

      // THEN
      expect(call()).resolves.toBeDefined()
      const table = drivers.database.tableFromSchema(newConfig.tables![0])
      expect(table.fields).toHaveLength(5)
      expect(table.fields[3].name).toBe('single_line_text')
      expect(table.fields[4].name).toBe('new_field')
    })

    it('should migrate a table with existing records', async () => {
      // GIVEN
      const table = drivers.database.tableFromSchema(singleLineText.tables![0])
      await table.create()
      await table.insertMany([
        { id: '1', fields: { single_line_text: 'John' }, created_at: new Date().toISOString() },
        { id: '2', fields: { single_line_text: 'Paul' }, created_at: new Date().toISOString() },
        { id: '3', fields: { single_line_text: 'Ringo' }, created_at: new Date().toISOString() },
      ])

      // WHEN
      const call = () => app.start(singleLineText)

      // THEN
      expect(call()).resolves.toBeDefined()
      const records = await table.list()
      expect(records).toHaveLength(3)
      expect(records[0].fields.single_line_text).toBe('John')
      expect(records[1].fields.single_line_text).toBe('Paul')
      expect(records[2].fields.single_line_text).toBe('Ringo')
    })
  })
})
