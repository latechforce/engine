import { describe, it, expect, beforeEach, mock } from 'bun:test'
import { Airtable, type AirtableConfig, type IAirtableSpi } from '.'

let spi: IAirtableSpi
let config: AirtableConfig
let airtable: Airtable

beforeEach(() => {
  // GIVEN
  config = { apiKey: '1234' }
  spi = {
    getConfig: mock(() => config),
    getTable: mock(),
  }
  airtable = new Airtable(spi)
})

describe('getConfig', () => {
  it('should return the config', () => {
    expect(airtable.getConfig()).toEqual(config)
  })
})

describe('getTable', () => {
  it('should get a table', async () => {
    // GIVEN
    const id = 'table-id'

    // WHEN
    airtable.getTable(id)

    // THEN
    expect(spi.getTable).toHaveBeenCalledWith(id)
  })
})
