import env from '../../../test/env'
import { cleanTestsTables, integration, testNotionIntegration } from './NotionIntegrationTest'
import BunTester from 'bun:test'

testNotionIntegration(
  BunTester,
  integration,
  { TABLE_ID: env.TEST_NOTION_TABLE_1_ID },
  cleanTestsTables
)
