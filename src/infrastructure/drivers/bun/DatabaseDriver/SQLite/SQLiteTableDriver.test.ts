import { SQLiteDatabaseTableDriver } from './SQLiteTableDriver'
import { testDatabaseTableDriver } from '../../../common/DatabaseDriver/DatabaseTableDriverTest'
import BunTester from 'bun:test'
import { getFirstAndSecondTableConfig } from '../../../../test/config'
import { SQLiteDatabaseDriver } from './SQLiteDriver'
import type { IDatabaseTableDriver } from '/adapter/spi/drivers/DatabaseTableSpi'

const setup = async () => {
  // GIVEN
  const sqliteDatabase = new SQLiteDatabaseDriver({ url: ':memory:', driver: 'SQLite' })
  const {
    tables: [firstTableConfig, secondTableConfig],
  } = getFirstAndSecondTableConfig([
    'name',
    'multiple_linked_record',
    'number_rollup',
    'multiple_select',
    'single_select',
  ])
  const firstTable = new SQLiteDatabaseTableDriver(
    firstTableConfig,
    sqliteDatabase.db
  ) as unknown as IDatabaseTableDriver
  const secondTable = new SQLiteDatabaseTableDriver(
    secondTableConfig,
    sqliteDatabase.db
  ) as unknown as IDatabaseTableDriver
  return { firstTable, secondTable }
}

testDatabaseTableDriver(BunTester, setup)
