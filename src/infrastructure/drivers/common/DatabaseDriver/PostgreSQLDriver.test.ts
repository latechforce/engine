import BunTester from 'bun:test'
import { testDatabaseDriver } from '@infrastructure/drivers/common/DatabaseDriver/DatabaseDriverTest'
import { setupPostgres, teardownPostgres } from './PostgreSQLDriverTestSetup'

testDatabaseDriver(BunTester, setupPostgres, teardownPostgres)
