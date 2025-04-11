import BunTester from 'bun:test'
import { testStorageBucketDriver } from '../../common/StorageDriver/StorageBucketDriverTest'
import { SQLiteStorageBucketDriver } from './SQLiteBucketDriver'
import { SQLiteDatabaseDriver } from '../DatabaseDriver/SQLite/SQLiteDriver'

const setup = async () => {
  const sqliteDatabase = new SQLiteDatabaseDriver({ url: ':memory:', driver: 'SQLite' })
  const bucket = new SQLiteStorageBucketDriver(
    'test',
    async (query) => sqliteDatabase.query(query),
    async (query) => sqliteDatabase.exec(query)
  )
  return bucket
}

testStorageBucketDriver(BunTester, setup)
