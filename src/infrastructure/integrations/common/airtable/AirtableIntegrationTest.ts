import type { IAirtableIntegration } from '@adapter/spi/integrations/AirtableSpi'
import type BunTester from 'bun:test'

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
