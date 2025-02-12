import { testNotionIntegration } from '/infrastructure/integrations/common/notion/NotionIntegrationTest'
import BunTester from 'bun:test'
import { integration } from './NotionIntegrationTest'
import { notionTableSample1 } from './NotionSamples'

testNotionIntegration(BunTester, integration, {
  TABLE_ID: notionTableSample1.name,
})
