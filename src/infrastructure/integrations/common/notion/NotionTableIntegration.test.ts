import env from '../../../test/env'
import { testNotionTableIntegration } from './NotionTableIntegrationTest'
import BunTester from 'bun:test'
import { cleanTestsTables, integration } from './NotionIntegrationTest'

testNotionTableIntegration(
  BunTester,
  integration,
  {
    TABLE_1_ID: env.TEST_NOTION_TABLE_1_ID,
    TABLE_2_ID: env.TEST_NOTION_TABLE_2_ID,
    TABLE_3_ID: env.TEST_NOTION_TABLE_3_ID,
  },
  cleanTestsTables
)
