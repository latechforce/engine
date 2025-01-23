import env from '@test/env'
import { testAirtableIntegration } from './AirtableIntegrationTest'
import { AirtableIntegration } from './AirtableIntegration'
import BunTester from 'bun:test'

export const integration = new AirtableIntegration({
  apiKey: env.TEST_AIRTABLE_API_KEY,
  baseId: env.TEST_AIRTABLE_BASE_ID,
})

export const testTable = await integration.getTable(env.TEST_AIRTABLE_TABLE_1_ID)

export const cleanTestTable = async () => {
  const records = await testTable.list()
  await testTable.deleteMany(records.map((record) => record.id))
}

testAirtableIntegration(
  BunTester,
  integration,
  { TABLE_ID: env.TEST_AIRTABLE_TABLE_1_ID },
  cleanTestTable
)
