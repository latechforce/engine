import env from '@test/env'
import { testNotionTableIntegration } from './NotionTableIntegrationTest'
import { cleanTestTable, integration } from './NotionIntegration.test'
import BunTester from 'bun:test'

testNotionTableIntegration(
  BunTester,
  integration,
  {
    TABLE_1_ID: env.TEST_NOTION_TABLE_1_ID,
    TABLE_2_ID: env.TEST_NOTION_TABLE_2_ID,
  },
  cleanTestTable
)
