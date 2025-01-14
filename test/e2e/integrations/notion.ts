import { NotionIntegration } from '@infrastructure/integrations/NotionIntegration'
import env from '@test/env'
import { Client } from '@notionhq/client'

const { TEST_NOTION_TOKEN, TEST_NOTION_TABLE_1_ID } = env

export const notion = new Client({
  auth: TEST_NOTION_TOKEN,
})

export const integration = new NotionIntegration({
  token: env.TEST_NOTION_TOKEN,
  pollingInterval: 10,
})

export const testTable = await integration.getTable(TEST_NOTION_TABLE_1_ID)

export const cleanTestTable = async () => {
  const pages = await testTable.list()
  await testTable.archiveMany(pages.map((page) => page.id))
}
