import BunTester, { describe, it, expect } from 'bun:test'
import { testAirtableIntegration } from '/infrastructure/integrations/common/airtable/AirtableIntegrationTest'
import { integration } from './AirtableIntegrationTest'

testAirtableIntegration(BunTester, integration, { TABLE_ID: 'table_1' })

describe('getTable', () => {
  it('should return a table with a name containing spaces', async () => {
    // GIVEN
    await integration.addTable('Table 3', [])

    // WHEN
    const table = await integration.getTable('Table 3')

    // THEN
    expect(table.name).toBe('Table 3')
  })
})
