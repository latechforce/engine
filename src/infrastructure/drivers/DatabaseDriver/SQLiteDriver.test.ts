import BunTester from 'bun:test'
import { SQLiteDatabaseDriver } from './SQLiteDriver'
import type { IDatabaseDriver } from '@adapter/spi/drivers/DatabaseSpi'
import { testDatabaseDriver } from '@infrastructure/drivers/DatabaseDriver/DatabaseDriverTest'

const setup = async (): Promise<IDatabaseDriver> => {
  // GIVEN
  const bunTable = new SQLiteDatabaseDriver({
    driver: 'SQLite',
    url: ':memory:',
  })
  return bunTable
}

testDatabaseDriver(BunTester, setup)
