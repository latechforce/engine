import BunTester from 'bun:test'
import { getPostgresDatabase, teardownPostgres } from '../DatabaseDriver/PostgreSQLDriverTestSetup'
import { PostgreSQLDriver } from './PostgreSQLDriver'
import { testStorageDriver } from './StorageDriverTest'
import { PostgreSQLDatabaseDriver } from '../DatabaseDriver/PostgreSQLDriver'

let postgresDatabase: PostgreSQLDatabaseDriver

const setup = async () => {
  postgresDatabase = await getPostgresDatabase()
  const storage = new PostgreSQLDriver(postgresDatabase.query, postgresDatabase.exec)
  return storage
}

const teardown = async () => {
  await postgresDatabase.disconnect()
  await teardownPostgres()
}

testStorageDriver(BunTester, setup, teardown)
