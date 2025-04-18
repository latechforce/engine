import type { INotionIntegration } from '/adapter/spi/integrations/NotionSpi'
import type BunTester from 'bun:test'
import { NotionIntegration } from './NotionIntegration'
import env from '../../../test/env'

export const integration = new NotionIntegration({
  account: 'test',
  token: env.TEST_NOTION_TOKEN,
  pollingInterval: 10,
})

export const testTable = await integration.getTable(env.TEST_NOTION_TABLE_1_ID)

export const cleanTestsTables = async () => {
  const response = await testTable.list()
  if (response.error) throw response.error
  await testTable.archiveMany(response.data.map((page) => page.id))
  const testTable2 = await integration.getTable(env.TEST_NOTION_TABLE_2_ID)
  const response2 = await testTable2.list()
  if (response2.error) throw response2.error
  await testTable2.archiveMany(response2.data.map((page) => page.id))
  const testTable3 = await integration.getTable(env.TEST_NOTION_TABLE_3_ID)
  const response3 = await testTable3.list()
  if (response3.error) throw response3.error
  await testTable3.archiveMany(response3.data.map((page) => page.id))
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
      const response = await integration.listAllUsers()
      if (response.error) throw response.error

      // THEN
      expect(response.data.length > 0).toBeTruthy()
    })
  })
}
