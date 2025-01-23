import env from '@test/env'
import { testNotionIntegration } from './NotionIntegrationTest'
import { NotionIntegration } from './NotionIntegration'
import BunTester from 'bun:test'

const { TEST_NOTION_TABLE_1_ID } = env

export const integration = new NotionIntegration({
  token: env.TEST_NOTION_TOKEN,
  pollingInterval: 10,
})

export const testTable = await integration.getTable(TEST_NOTION_TABLE_1_ID)

export const cleanTestTable = async () => {
  const pages = await testTable.list()
  await testTable.archiveMany(pages.map((page) => page.id))
}

testNotionIntegration(
  BunTester,
  integration,
  { TABLE_ID: env.TEST_NOTION_TABLE_1_ID },
  cleanTestTable
)
