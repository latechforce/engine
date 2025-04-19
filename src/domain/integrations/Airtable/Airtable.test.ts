import { describe, it, expect, beforeEach, mock } from 'bun:test'
import { Airtable, type AirtableConfig, type IAirtableSpi } from '.'
import type { BaseServices } from '../base'

let spi: IAirtableSpi
let config: AirtableConfig
let airtable: Airtable
let services: BaseServices

beforeEach(() => {
  // GIVEN
  config = { apiKey: '1234', databaseId: '1234', account: 'test' }
  spi = {
    getTable: mock(),
    config,
    testConnection: mock(),
  }
  services = {
    server: mock() as any,
    schemaValidator: mock() as any,
  }
  airtable = new Airtable([spi], services)
})

describe('validate', () => {
  it('should check the configuration', async () => {
    // WHEN
    await airtable.validate({ account: config.account, entity: 'Integration', name: 'Airtable' })

    // THEN
    expect(spi.testConnection).toHaveBeenCalledWith()
  })
})

describe('getTable', () => {
  it('should get a table', async () => {
    // GIVEN
    const id = 'table-id'

    // WHEN
    airtable.getTable(config.account, id)

    // THEN
    expect(spi.getTable).toHaveBeenCalledWith(id)
  })
})
