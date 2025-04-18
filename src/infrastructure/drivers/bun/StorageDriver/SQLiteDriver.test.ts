import BunTester from 'bun:test'
import { SQLiteStorageDriver } from './SQLiteDriver'
import { testStorageDriver } from '../../common/StorageDriver/StorageDriverTest'
import { SQLiteDatabaseDriver } from '../DatabaseDriver/SQLite/SQLiteDriver'
import type { IStorageDriver } from '/adapter/spi/drivers/StorageSpi'

const setup = async (): Promise<IStorageDriver> => {
  const db = new SQLiteDatabaseDriver({
    type: 'SQLite',
    url: ':memory:',
  })
  return new SQLiteStorageDriver(db.query, db.exec)
}

testStorageDriver(BunTester, setup)
