import { SQLiteDatabaseTableDriver } from './SQLiteTableDriver'
import { testDatabaseTableDriver } from './DatabaseTableDriverTest'
import BunTester from 'bun:test'
import { getFirstAndSecondTableConfig } from '@test/config'
import { SQLiteDatabaseDriver } from './SQLiteDriver'

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
  ])
  const firstTable = new SQLiteDatabaseTableDriver(firstTableConfig, sqliteDatabase.db)
  const secondTable = new SQLiteDatabaseTableDriver(secondTableConfig, sqliteDatabase.db)
  return { firstTable, secondTable }
}

testDatabaseTableDriver(BunTester, setup)
