import BunTester from 'bun:test'
import { testAirtableTableIntegration } from '/infrastructure/integrations/common/airtable/AirtableTableIntegrationTest'
import { integration } from './AirtableIntegrationTest'

testAirtableTableIntegration(BunTester, integration, {
  TABLE_1_ID: 'table_1',
  TABLE_2_ID: 'table_2',
})
