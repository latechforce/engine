import { SQLiteDatabaseTableDriver } from './SQLiteTableDriver'
import type { Database as SQLiteDatabase } from 'better-sqlite3'
import { Database } from 'bun:sqlite'
import type { IDatabaseTableDriver } from '@adapter/spi/drivers/DatabaseTableSpi'
import { testDatabaseTableDriver } from '../../shared/DatabaseDriver/DatabaseTableDriverTest'
import BunTester from 'bun:test'

const setup = async (): Promise<IDatabaseTableDriver> => {
  // GIVEN
  const db = new Database() as unknown as SQLiteDatabase
  const sqliteTable = new SQLiteDatabaseTableDriver(
    {
      name: 'table_1',
      fields: [
        {
          name: 'name',
          type: 'SingleLineText',
        },
      ],
    },
    db
  )
  return sqliteTable
}

testDatabaseTableDriver(BunTester, setup)
