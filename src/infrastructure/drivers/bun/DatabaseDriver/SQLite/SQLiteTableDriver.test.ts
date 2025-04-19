import { SQLiteDatabaseTableDriver } from './SQLiteTableDriver'
import { testDatabaseTableDriver } from '../../../common/DatabaseDriver/DatabaseTableDriverTest'
import BunTester from 'bun:test'
import { SQLiteDatabaseDriver } from './SQLiteDriver'
import type { IDatabaseTableDriver } from '/adapter/spi/drivers/DatabaseTableSpi'
import { TableMapper } from '/adapter/api/mappers/TableMapper'
import { configTableWithAllFields } from '/examples/config/table/withAllFields'

const setup = async () => {
  // GIVEN
  const sqliteDatabase = new SQLiteDatabaseDriver({ url: ':memory:', type: 'SQLite' })
  const [firstTableSchema, secondTableSchema] = configTableWithAllFields.tables!
  const firstTable = new SQLiteDatabaseTableDriver(
    TableMapper.toConfig({
      ...firstTableSchema,
      fields: firstTableSchema.fields!.filter((field) =>
        [
          'single_line_text',
          'multiple_linked_record',
          'number_rollup',
          'multiple_select',
          'single_select',
        ].includes(field.name)
      ),
    }),
    sqliteDatabase.db
  ) as unknown as IDatabaseTableDriver
  const secondTable = new SQLiteDatabaseTableDriver(
    TableMapper.toConfig(secondTableSchema),
    sqliteDatabase.db
  ) as unknown as IDatabaseTableDriver
  return { firstTable, secondTable }
}

testDatabaseTableDriver(BunTester, setup)
