import { Database } from 'bun:sqlite'
import { SQLiteDatabaseTableDriver } from './SQLiteTableDriver'
import type { IDatabaseTableDriver } from '@adapter/spi/drivers/DatabaseTableSpi'
import { testDatabaseTableDriver } from '../../shared/DatabaseDriver/DatabaseTableDriverTest'
import BunTester from 'bun:test'

const setup = async (): Promise<IDatabaseTableDriver> => {
  // GIVEN
  const db = new Database()
  const bunTable = new SQLiteDatabaseTableDriver(
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
  return bunTable
}

testDatabaseTableDriver(BunTester, setup)
