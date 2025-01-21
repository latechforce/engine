import type { INotionIntegration } from '@adapter/spi/integrations/NotionSpi'
import { describe, it, expect, afterAll } from 'bun:test'

export function testNotionIntegration(
  integration: INotionIntegration,
  env: { TABLE_ID: string },
  teardown?: () => Promise<void>
) {
  const { TABLE_ID } = env

  if (teardown) afterAll(teardown)

  describe('getTable', () => {
    it('should get a table id without -', async () => {
      // GIVEN
      const table = await integration.getTable(TABLE_ID)

      // THEN
      expect(table.id).not.toContain('-')
    })
  })

  describe('listAllUsers', () => {
    it('should retrieve all the users of a workspace', async () => {
      // WHEN
      const users = await integration.listAllUsers()

      // THEN
      expect(users.length > 0).toBeTruthy()
    })
  })
}
