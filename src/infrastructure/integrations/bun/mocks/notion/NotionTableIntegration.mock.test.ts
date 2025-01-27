import { testNotionTableIntegration } from '@infrastructure/integrations/common/notion/NotionTableIntegrationTest'
import BunTester from 'bun:test'
import { integration } from './NotionIntegrationTest'

testNotionTableIntegration(BunTester, integration, {
  TABLE_1_ID: 'table_1',
  TABLE_2_ID: 'table_2',
})
