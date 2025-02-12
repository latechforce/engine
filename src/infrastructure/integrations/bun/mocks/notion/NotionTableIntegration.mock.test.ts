import { testNotionTableIntegration } from '/infrastructure/integrations/common/notion/NotionTableIntegrationTest'
import BunTester from 'bun:test'
import { integration } from './NotionIntegrationTest'
import { notionTableSample1, notionTableSample2, notionTableSample3 } from './NotionSamples'

await integration.addTable(notionTableSample3.name, notionTableSample3.fields)

testNotionTableIntegration(BunTester, integration, {
  TABLE_1_ID: notionTableSample1.name,
  TABLE_2_ID: notionTableSample2.name,
  TABLE_3_ID: notionTableSample3.name,
})
