import { testNotionIntegration } from '/infrastructure/integrations/common/notion/NotionIntegrationTest'
import BunTester, { describe, it, expect } from 'bun:test'
import { integration } from './NotionIntegrationTest'
import { notionTableSample1, notionTableSample3 } from './NotionSamples'
import type { NotionTableIntegration } from './NotionTableIntegration.mock'

testNotionIntegration(BunTester, integration, {
  TABLE_ID: notionTableSample1.name,
})

let table: NotionTableIntegration

describe('addTable', () => {
  it('should add a table with real Notion table config', async () => {
    // WHEN
    const call = async () => {
      table = await integration.addTable(notionTableSample3.name, notionTableSample3.fields)
    }

    // THEN
    expect(call()).resolves
  })

  it('should read data with real Notion table config', async () => {
    // GIVEN
    const { id } = await table.insert({
      'Email de contact': 'test',
    })

    // WHEN
    const page = await table.retrieve(id)

    // THEN
    expect(page.properties['Email de contact']).toBe('test')
  })
})
