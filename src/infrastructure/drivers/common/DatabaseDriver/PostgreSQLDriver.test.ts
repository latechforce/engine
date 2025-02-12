import BunTester from 'bun:test'
import { testDatabaseDriver } from '/infrastructure/drivers/common/DatabaseDriver/DatabaseDriverTest'
import { getPostgresDatabase, teardownPostgres } from './PostgreSQLDriverTestSetup'

testDatabaseDriver(BunTester, getPostgresDatabase, teardownPostgres)
