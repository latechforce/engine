import { SQLiteDatabaseTableDriver } from './SQLiteTableDriver'
import type { Database as SQLiteDatabase } from 'better-sqlite3'
import { testDatabaseTableDriver } from '../../shared/DatabaseDriver/DatabaseTableDriverTest'
import BunTester from 'bun:test'
import { getFirstAndSecondTableConfig } from '@test/config'
import { SQLiteDatabaseDriver } from '../../bun/DatabaseDriver/SQLiteDriver'

const setup = async () => {
  // GIVEN
  const sqliteDatabase = new SQLiteDatabaseDriver({ url: ':memory:', driver: 'SQLite' })
  const {
    tables: [firstTableConfig, secondTableConfig],
  } = getFirstAndSecondTableConfig(['name', 'multiple_linked_record'])
  const nodeDB = sqliteDatabase.db as unknown as SQLiteDatabase
  const firstTable = new SQLiteDatabaseTableDriver(firstTableConfig, nodeDB)
  const secondTable = new SQLiteDatabaseTableDriver(secondTableConfig, nodeDB)
  return { firstTable, secondTable }
}

testDatabaseTableDriver(BunTester, setup)
