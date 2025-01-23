import { AirtableIntegration } from './AirtableIntegration.mock'
import BunTester from 'bun:test'
import { testAirtableIntegration } from '@infrastructure/integrations/common/airtable/AirtableIntegrationTest'

export const integration = new AirtableIntegration({
  apiKey: 'test',
  baseId: 'test',
})

await integration.connect()

await integration.addTable('table_1', [])

testAirtableIntegration(BunTester, integration, { TABLE_ID: 'table_1' })
