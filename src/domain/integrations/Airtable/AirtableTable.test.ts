import { describe, it, expect, beforeEach, mock } from 'bun:test'
import { AirtableTable, type IAirtableTableSpi } from './AirtableTable'
import type { FilterConfig } from '/domain/entities/Filter'
import { FilterMapper } from '/domain/entities/Filter'

let spi: IAirtableTableSpi
let airtableTable: AirtableTable

beforeEach(() => {
  // GIVEN
  spi = {
    id: 'tableid',
    name: 'Table Name',
    insert: mock(),
    insertMany: mock(),
    update: mock(),
    updateMany: mock(),
    retrieve: mock(),
    delete: mock(),
    list: mock(),
  }
  airtableTable = new AirtableTable(spi)
})

describe('insert', () => {
  it('should call SPI insert', async () => {
    // GIVEN
    const record = { title: 'Test Record' }

    // WHEN
    await airtableTable.insert(record)

    // THEN
    expect(spi.insert).toHaveBeenCalledWith(record)
  })
})

describe('insertMany', () => {
  it('should call SPI insertMany', async () => {
    // GIVEN
    const records = [{ title: 'Record 1' }, { title: 'Record 2' }]

    // WHEN
    await airtableTable.insertMany(records)

    // THEN
    expect(spi.insertMany).toHaveBeenCalledWith(records)
  })
})

describe('update', () => {
  it('should call SPI update', async () => {
    // GIVEN
    const id = 'record-id'
    const record = { title: 'Updated Title' }

    // WHEN
    await airtableTable.update(id, record)

    // THEN
    expect(spi.update).toHaveBeenCalledWith(id, record)
  })
})

describe('updateMany', () => {
  it('should call SPI updateMany ', async () => {
    // GIVEN
    const records = [
      { id: '1', fields: { title: 'Record 1' } },
      { id: '2', fields: { title: 'Record 2' } },
    ]

    // WHEN
    await airtableTable.updateMany(records)

    // THEN
    expect(spi.updateMany).toHaveBeenCalledWith(records)
  })
})

describe('retrieve', () => {
  it('should call SPI retrieve with the given ID', async () => {
    // GIVEN
    const id = 'record-id'

    // WHEN
    await airtableTable.retrieve(id)

    // THEN
    expect(spi.retrieve).toHaveBeenCalledWith(id)
  })
})

describe('delete', () => {
  it('should call SPI archive with the given ID', async () => {
    // GIVEN
    const id = 'record-id'

    // WHEN
    await airtableTable.delete(id)

    // THEN
    expect(spi.delete).toHaveBeenCalledWith(id)
  })
})

describe('list', () => {
  it('should call SPI list without a filter', async () => {
    // WHEN
    await airtableTable.list()

    // THEN
    expect(spi.list).toHaveBeenCalledWith(undefined)
  })

  it('should call SPI list with a filter', async () => {
    // GIVEN
    const filter: FilterConfig = {
      field: 'created_time',
      operator: 'OnOrAfter',
      value: '2023-01-01T00:00:00Z',
    }

    // WHEN
    await airtableTable.list(filter)

    // THEN
    expect(spi.list).toHaveBeenCalledWith(FilterMapper.toEntity(filter))
  })
})
