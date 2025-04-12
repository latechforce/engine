import { SQLiteDatabaseTableDriver } from './SQLiteTableDriver'
import { testDatabaseTableDriver } from '../../../common/DatabaseDriver/DatabaseTableDriverTest'
import BunTester from 'bun:test'
import { getFirstAndSecondTableSchema } from '/test/common'
import { SQLiteDatabaseDriver } from './SQLiteDriver'
import type { IDatabaseTableDriver } from '/adapter/spi/drivers/DatabaseTableSpi'
import { TableMapper } from '/adapter/api/mappers/TableMapper'

const setup = async () => {
  // GIVEN
  const sqliteDatabase = new SQLiteDatabaseDriver({ url: ':memory:', driver: 'SQLite' })
  const {
    tables: [firstTableSchema, secondTableSchema],
  } = getFirstAndSecondTableSchema([
    'name',
    'multiple_linked_record',
    'number_rollup',
    'multiple_select',
    'single_select',
  ])
  const firstTable = new SQLiteDatabaseTableDriver(
    TableMapper.toConfig(firstTableSchema),
    sqliteDatabase.db
  ) as unknown as IDatabaseTableDriver
  const secondTable = new SQLiteDatabaseTableDriver(
    TableMapper.toConfig(secondTableSchema),
    sqliteDatabase.db
  ) as unknown as IDatabaseTableDriver
  return { firstTable, secondTable }
}

testDatabaseTableDriver(BunTester, setup)
