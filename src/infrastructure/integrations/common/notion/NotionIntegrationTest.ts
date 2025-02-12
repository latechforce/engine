import type { INotionIntegration } from '/adapter/spi/integrations/NotionSpi'
import type BunTester from 'bun:test'
import { NotionIntegration } from './NotionIntegration'
import env from '../../../test/env'

export const integration = new NotionIntegration({
  token: env.TEST_NOTION_TOKEN,
  pollingInterval: 10,
})

export const testTable = await integration.getTable(env.TEST_NOTION_TABLE_1_ID)

export const cleanTestsTables = async () => {
  const pages = await testTable.list()
  await testTable.archiveMany(pages.map((page) => page.id))
  const testTable2 = await integration.getTable(env.TEST_NOTION_TABLE_2_ID)
  const pages2 = await testTable.list()
  await testTable2.archiveMany(pages2.map((page) => page.id))
  const testTable3 = await integration.getTable(env.TEST_NOTION_TABLE_3_ID)
  const pages3 = await testTable.list()
  await testTable3.archiveMany(pages3.map((page) => page.id))
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
