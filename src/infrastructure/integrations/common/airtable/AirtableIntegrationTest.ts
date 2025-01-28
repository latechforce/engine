import type { IAirtableIntegration } from '@adapter/spi/integrations/AirtableSpi'
import env from '@test/env'
import type BunTester from 'bun:test'
import { AirtableIntegration } from './AirtableIntegration'

export const integration = new AirtableIntegration({
  apiKey: env.TEST_AIRTABLE_API_KEY,
  baseId: env.TEST_AIRTABLE_BASE_ID,
})

export const testTable = await integration.getTable(env.TEST_AIRTABLE_TABLE_1_ID)

export const cleanTestTable = async () => {
  const records = await testTable.list()
  await testTable.deleteMany(records.map((record) => record.id))
}

export function testAirtableIntegration(
  { describe, it, expect, afterAll }: typeof BunTester,
  integration: IAirtableIntegration,
  env: { TABLE_ID: string },
  teardown?: () => Promise<void>
) {
  const { TABLE_ID } = env

  if (teardown) afterAll(teardown)

  describe('getTable', () => {
    it('should get a table', async () => {
      // GIVEN
      const table = await integration.getTable(TABLE_ID)

      // THEN
      expect(table).toBeDefined()
    })
  })
}
