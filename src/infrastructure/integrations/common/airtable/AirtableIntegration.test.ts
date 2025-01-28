import env from '../../../test/env'
import { cleanTestTable, integration, testAirtableIntegration } from './AirtableIntegrationTest'
import BunTester from 'bun:test'

testAirtableIntegration(
  BunTester,
  integration,
  { TABLE_ID: env.TEST_AIRTABLE_TABLE_1_ID },
  cleanTestTable
)
