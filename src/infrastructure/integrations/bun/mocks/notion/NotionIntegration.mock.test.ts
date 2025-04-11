import { testNotionIntegration } from '/infrastructure/integrations/common/notion/NotionIntegrationTest'
import BunTester, { describe, it, expect } from 'bun:test'
import { integration } from './NotionIntegrationTest'
import {
  notionTableSample1,
  notionTableSample3,
  type NotionTableSample3,
} from './NotionTestSamples'
import type { NotionTableIntegration } from './NotionTableIntegration.mock'

testNotionIntegration(BunTester, integration, {
  TABLE_ID: notionTableSample1.name,
})

let table: NotionTableIntegration<NotionTableSample3>

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
    const response = await table.insert({
      'Email de contact': 'test',
    })
    if (response.error) {
      throw new Error(response.error.message)
    }
    const { id } = response.data

    // WHEN
    const page = await table.retrieve(id)

    // THEN
    expect(page.data?.properties['Email de contact']).toBe('test')
  })
})
