import BunTester from 'bun:test'
import { getPostgresDatabase, teardownPostgres } from '../DatabaseDriver/PostgreSQLDriverTestSetup'
import { PostgreSQLStorageBucketDriver } from './PostgreSQLBucketDriver'
import type { PostgreSQLDatabaseDriver } from '../DatabaseDriver/PostgreSQLDriver'
import { testStorageBucketDriver } from './StorageBucketDriverTest'

let postgresDatabase: PostgreSQLDatabaseDriver

const setup = async () => {
  postgresDatabase = await getPostgresDatabase()
  const storageDriver = new PostgreSQLStorageBucketDriver(
    'test',
    postgresDatabase.query,
    postgresDatabase.exec
  )
  return storageDriver
}

const teardown = async () => {
  await postgresDatabase.disconnect()
  await teardownPostgres()
}

testStorageBucketDriver(BunTester, setup, teardown)
