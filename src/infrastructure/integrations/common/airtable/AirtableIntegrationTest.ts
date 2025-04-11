import type { IAirtableIntegration } from '/adapter/spi/integrations/AirtableSpi'
import env from '../../../test/env'
import type BunTester from 'bun:test'
import { AirtableIntegration } from './AirtableIntegration'

export const integration = new AirtableIntegration({
  name: 'test',
  apiKey: env.TEST_AIRTABLE_API_KEY,
  databaseId: env.TEST_AIRTABLE_BASE_ID,
})

export const testTable = await integration.getTable(env.TEST_AIRTABLE_TABLE_1_ID)

export const cleanTestTable = async () => {
  const { data: records = [] } = await testTable.list()
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

  describe('testConnection', () => {
    it('should check the configuration', async () => {
      const response = await integration.testConnection()
      expect(response).toBeUndefined()
    })
  })

  describe('getTable', () => {
    it('should get a table', async () => {
      // GIVEN
      const table = await integration.getTable(TABLE_ID)

      // THEN
      expect(table).toBeDefined()
    })
  })
}
