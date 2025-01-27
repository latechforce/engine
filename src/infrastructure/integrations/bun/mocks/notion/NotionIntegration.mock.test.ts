import { testNotionIntegration } from '@infrastructure/integrations/common/notion/NotionIntegrationTest'
import BunTester from 'bun:test'
import { integration } from './NotionIntegrationTest'

testNotionIntegration(BunTester, integration, {
  TABLE_ID: 'table_1',
})
