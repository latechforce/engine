import BunTester from 'bun:test'
import { SQLiteStorageDriver } from './SQLiteDriver'
import { testStorageDriver } from '../../common/StorageDriver/StorageDriverTest'
import { SQLiteDatabaseDriver } from '../DatabaseDriver/SQLite/SQLiteDriver'
import type { IStorageDriver } from '/adapter/spi/drivers/StorageSpi'

const setup = async (): Promise<IStorageDriver> => {
  const db = new SQLiteDatabaseDriver({
    driver: 'SQLite',
    url: ':memory:',
  })
  return new SQLiteStorageDriver(
    async (query) => db.query(query),
    async (query) => db.exec(query)
  )
}

testStorageDriver(BunTester, setup)
