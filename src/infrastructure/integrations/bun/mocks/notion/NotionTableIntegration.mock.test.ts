import { testNotionTableIntegration } from '/infrastructure/integrations/common/notion/NotionTableIntegrationTest'
import BunTester from 'bun:test'
import { integration } from './NotionIntegrationTest'
import { notionTableSample1, notionTableSample2 } from './NotionTableIntegration.mock'

testNotionTableIntegration(BunTester, integration, {
  TABLE_1_ID: notionTableSample1.name,
  TABLE_2_ID: notionTableSample2.name,
})
