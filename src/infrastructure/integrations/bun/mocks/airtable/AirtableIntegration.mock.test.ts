import BunTester from 'bun:test'
import { testAirtableIntegration } from '/infrastructure/integrations/common/airtable/AirtableIntegrationTest'
import { integration } from './AirtableIntegrationTest'

testAirtableIntegration(BunTester, integration, { TABLE_ID: 'table_1' })
