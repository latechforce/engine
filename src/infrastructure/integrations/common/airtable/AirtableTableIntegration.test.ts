import env from '@test/env'
import { testAirtableTableIntegration } from './AirtableTableIntegrationTest'
import { cleanTestTable, integration } from './AirtableIntegration.test'
import BunTester from 'bun:test'

testAirtableTableIntegration(
  BunTester,
  integration,
  {
    TABLE_1_ID: env.TEST_AIRTABLE_TABLE_1_ID,
    TABLE_2_ID: env.TEST_AIRTABLE_TABLE_2_ID,
  },
  cleanTestTable
)
