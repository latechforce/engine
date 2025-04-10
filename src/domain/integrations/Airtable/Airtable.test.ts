import { describe, it, expect, beforeEach, mock } from 'bun:test'
import { Airtable, type AirtableConfig, type IAirtableSpi } from '.'

let spi: IAirtableSpi
let config: AirtableConfig
let airtable: Airtable

beforeEach(() => {
  // GIVEN
  config = { apiKey: '1234', baseId: '1234', name: 'test' }
  spi = {
    getTable: mock(),
    config,
    checkConfiguration: mock(),
  }
  airtable = new Airtable([spi])
})

describe('validate', () => {
  it('should check the configuration', async () => {
    // WHEN
    await airtable.validate({ account: config.name, entity: 'Integration', name: 'Airtable' })

    // THEN
    expect(spi.checkConfiguration).toHaveBeenCalledWith()
  })
})

describe('getTable', () => {
  it('should get a table', async () => {
    // GIVEN
    const id = 'table-id'

    // WHEN
    airtable.getTable(config.name, id)

    // THEN
    expect(spi.getTable).toHaveBeenCalledWith(id)
  })
})
