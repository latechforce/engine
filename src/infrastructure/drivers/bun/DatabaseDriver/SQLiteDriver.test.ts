import BunTester from 'bun:test'
import { SQLiteDatabaseDriver } from './SQLiteDriver'
import type { IDatabaseDriver } from '/adapter/spi/drivers/DatabaseSpi'
import { testDatabaseDriver } from '/infrastructure/drivers/common/DatabaseDriver/DatabaseDriverTest'

const setup = async (): Promise<IDatabaseDriver> => {
  return new SQLiteDatabaseDriver({
    driver: 'SQLite',
    url: ':memory:',
  })
}

testDatabaseDriver(BunTester, setup)
