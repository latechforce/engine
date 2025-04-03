import BunTester from 'bun:test'
import { testStorageBucketDriver } from '../../common/StorageDriver/StorageBucketDriverTest'
import { SQLiteStorageBucketDriver } from './SQLiteBucketDriver'
import { SQLiteDatabaseDriver } from '../DatabaseDriver/SQLiteDriver'

const setup = async () => {
  const sqliteDatabase = new SQLiteDatabaseDriver({ url: ':memory:', driver: 'SQLite' })
  const bucket = new SQLiteStorageBucketDriver('test', sqliteDatabase.query, sqliteDatabase.exec)
  return bucket
}

testStorageBucketDriver(BunTester, setup)
