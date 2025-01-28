import type { INotionIntegration } from '/adapter/spi/integrations/NotionSpi'
import type BunTester from 'bun:test'
import { NotionIntegration } from './NotionIntegration'
import env from '../../../test/env'

export const integration = new NotionIntegration({
  token: env.TEST_NOTION_TOKEN,
  pollingInterval: 10,
})

export const testTable = await integration.getTable(env.TEST_NOTION_TABLE_1_ID)

export const cleanTestTable = async () => {
  const pages = await testTable.list()
  await testTable.archiveMany(pages.map((page) => page.id))
}

export function testNotionIntegration(
  { describe, it, expect, afterAll }: typeof BunTester,
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
