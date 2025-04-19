import Tester, { expect, describe, it } from 'bun:test'
import { Mock } from '/test/bun'
import { configTableFieldSingleLineText } from '/examples/config/table/field/singleLineText'
import { configTableFieldSingleLineTextRequired } from '/examples/config/table/field/singleLineText/required'
import { configTable } from '/examples/config/table'
import { configTableSchema } from '/examples/config/table/schema'

const mock = new Mock(Tester, { drivers: ['Database'] })

mock.app(({ app, drivers }) => {
  describe('on start', () => {
    it('should create a not existing table', async () => {
      // GIVEN
      const table = drivers.database.tableFromSchema(configTableFieldSingleLineText.tables![0])
      expect(table.exists()).resolves.toBe(false)

      // WHEN
      await app.start(configTableFieldSingleLineText)

      // THEN
      expect(table.exists()).resolves.toBe(true)
    })

    it('should connect to an existing table', async () => {
      // GIVEN
      const table = drivers.database.tableFromSchema(configTableFieldSingleLineText.tables![0])
      await table.create()
      expect(table.exists()).resolves.toBe(true)

      // WHEN
      const call = () => app.start(configTableFieldSingleLineText)

      // THEN
      expect(call()).resolves.toBeDefined()
      expect(table.exists()).resolves.toBe(true)
    })

    describe('should create a table with', () => {
      it('a name', async () => {
        // WHEN
        await app.start(configTable)

        // THEN
        const table = drivers.database.tableFromSchema(configTable.tables![0])
        expect(table.name).toBe('table')
      })

      it('a default schema', async () => {
        // WHEN
        await app.start(configTableFieldSingleLineText)

        // THEN
        const table = drivers.database.tableFromSchema(configTableFieldSingleLineText.tables![0])
        expect(table.getSchema()).resolves.toBe('public')
      })

      it('a schema', async () => {
        // WHEN
        await app.start(configTableSchema)

        // THEN
        const table = drivers.database.tableFromSchema(configTableSchema.tables![0])
        expect(table.getSchema()).resolves.toBe('private')
      })

      it('default fields', async () => {
        // WHEN
        await app.start(configTableFieldSingleLineText)

        // THEN
        const table = drivers.database.tableFromSchema(configTableFieldSingleLineText.tables![0])
        const columns = await table.getColumns()
        expect(columns).toHaveLength(4)
        expect(columns[0].name).toBe('id')
        expect(columns[1].name).toBe('created_at')
        expect(columns[2].name).toBe('updated_at')
        expect(columns[3].name).toBe('single_line_text')
      })

      it('a named field', async () => {
        // WHEN
        await app.start(configTableFieldSingleLineText)

        // THEN
        const table = drivers.database.tableFromSchema(configTableFieldSingleLineText.tables![0])
        const columns = await table.getColumns()
        expect(columns[3].name).toBe('single_line_text')
      })

      it('a required field', async () => {
        // WHEN
        await app.start(configTableFieldSingleLineTextRequired)

        // THEN
        const table = drivers.database.tableFromSchema(
          configTableFieldSingleLineTextRequired.tables![0]
        )
        const columns = await table.getColumns()
        expect(columns[3].required).toBe(true)
      })
    })
  })
})
