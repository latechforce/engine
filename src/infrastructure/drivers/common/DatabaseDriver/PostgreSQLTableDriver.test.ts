import BunTester from 'bun:test'
import { testDatabaseTableDriver } from './DatabaseTableDriverTest'
import { PostgreSQLDatabaseTableDriver } from './PostgreSQLTableDriver'
import { getPostgresDatabase, teardownPostgres } from './PostgreSQLDriverTestSetup'
import type { PostgreSQLDatabaseDriver } from './PostgreSQLDriver'
import { TableMapper } from '/adapter/api/mappers/TableMapper'
import { configTableWithAllFields } from '/examples/config/table/withAllFields'

let postgresDatabase: PostgreSQLDatabaseDriver

const setup = async () => {
  postgresDatabase = await getPostgresDatabase()
  const [firstTableSchema, secondTableSchema] = configTableWithAllFields.tables!
  const firstTable = new PostgreSQLDatabaseTableDriver(
    TableMapper.toConfig({
      ...firstTableSchema,
      fields: firstTableSchema.fields!.filter((field) =>
        [
          'single_line_text',
          'multiple_linked_record',
          'number_rollup',
          'multiple_select',
          'single_select',
        ].includes(field.name)
      ),
    }),
    postgresDatabase.db
  )
  const secondTable = new PostgreSQLDatabaseTableDriver(
    TableMapper.toConfig(secondTableSchema),
    postgresDatabase.db
  )
  return { firstTable, secondTable }
}

const teardown = async () => {
  await postgresDatabase.disconnect()
  await teardownPostgres()
}

testDatabaseTableDriver(BunTester, setup, teardown)
