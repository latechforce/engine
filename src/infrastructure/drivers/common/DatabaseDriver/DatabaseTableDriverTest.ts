import type { IDatabaseTableDriver } from '/adapter/spi/drivers/DatabaseTableSpi'
import { getFirstAndSecondTableConfig } from '../../../test/config'
import type BunTester from 'bun:test'

const {
  tables: [, secondTableConfig],
} = getFirstAndSecondTableConfig(['name', 'multiple_linked_record', 'number_rollup'])

export function testDatabaseTableDriver(
  { describe, beforeAll, afterAll, it, expect }: typeof BunTester,
  setup: () => Promise<{
    firstTable: IDatabaseTableDriver
    secondTable: IDatabaseTableDriver
  }>,
  teardown?: () => Promise<void>
) {
  let firstTable: IDatabaseTableDriver
  let secondTable: IDatabaseTableDriver
  const created_at = new Date().toISOString()
  const updated_at = new Date().toISOString()

  beforeAll(async () => {
    const tables = await setup()
    firstTable = tables.firstTable
    secondTable = tables.secondTable
  })

  afterAll(async () => {
    if (teardown) await teardown()
  })

  describe('create', () => {
    it('should create a table', async () => {
      // THEN
      await secondTable.create()
    })

    it('should not create a table if already exist', async () => {
      // THEN
      expect(secondTable.create()).rejects.toThrowError(
        `Table "${secondTableConfig.name}" already exists`
      )
    })

    it('should have an "id" field', async () => {
      // WHEN
      const id = secondTable.fields.find((field) => field.name === 'id')

      // THEN
      expect(id).toStrictEqual({
        name: 'id',
        type: 'SingleLineText',
        required: true,
      })
    })

    it('should have an "created_at" field', async () => {
      // WHEN
      const createdAt = secondTable.fields.find((field) => field.name === 'created_at')

      // THEN
      expect(createdAt).toStrictEqual({
        name: 'created_at',
        type: 'DateTime',
        required: true,
      })
    })

    it('should have an "updated_at" field', async () => {
      // WHEN
      const updatedAt = secondTable.fields.find((field) => field.name === 'updated_at')

      // THEN
      expect(updatedAt).toStrictEqual({
        name: 'updated_at',
        type: 'DateTime',
      })
    })

    it('should create a table that has another table dependency', async () => {
      // THEN
      await firstTable.create()
    })
  })

  describe('createView', () => {
    it('should create a view', async () => {
      // THEN
      await secondTable.createView()
    })

    it('should create create a view if already exist', async () => {
      // THEN
      await secondTable.createView()
    })

    it('should create a view that has another table dependency', async () => {
      // THEN
      await firstTable.createView()
    })
  })

  describe('insert', () => {
    it('should insert a row', async () => {
      // WHEN
      await firstTable.insert({
        id: '1',
        fields: { name: 'John', multiple_select: ['Red', 'Blue'] },
        created_at,
      })
    })

    it('should return an error if a record id already exist', async () => {
      // WHEN
      const call = () =>
        firstTable.insert({
          id: '1',
          fields: { name: 'John' },
          created_at,
        })

      // THEN
      expect(call()).rejects.toThrowError('Record id already exists')
    })

    it('should return an error if a multiple linked record is not valid', async () => {
      // WHEN
      const call = () =>
        firstTable.insert({
          id: '2',
          fields: { multiple_linked_record: ['1'] },
          created_at,
        })

      // THEN
      expect(call()).rejects.toThrowError('Invalid linked record')
    })

    it('should remove record created if a multiple linked record is not valid', async () => {
      // GIVEN
      await secondTable.insert({
        id: '1',
        fields: { name: 'Row 1' },
        created_at,
      })

      // WHEN
      await firstTable
        .insert({
          id: '2',
          fields: { multiple_linked_record: ['1', '2'] },
          created_at,
        })
        .catch(() => {})

      // THEN
      const record = await firstTable.readById('2')
      expect(record).toBeUndefined()
    })
  })

  describe('update', () => {
    it('should update a row', async () => {
      // WHEN
      await firstTable.update({
        id: '1',
        fields: { name: 'John Doe' },
        updated_at,
      })
    })
  })

  describe('read', () => {
    it('should return a row with a filter', async () => {
      // WHEN
      const row = await firstTable.read({
        field: 'name',
        operator: 'Is',
        value: 'John Doe',
      })

      // THEN
      expect(row).toStrictEqual({
        id: '1',
        fields: {
          name: 'John Doe',
          multiple_linked_record: [],
          number_rollup: 0,
          multiple_select: ['Red', 'Blue'],
        },
        created_at,
        updated_at,
      })
    })

    it('should not return a row with an empty "or" filter', async () => {
      // WHEN
      const row = await firstTable.read({ or: [] })

      // THEN
      expect(row).toBeUndefined()
    })

    it('should not return a row with an empty "and" filter', async () => {
      // WHEN
      const row = await firstTable.read({ and: [] })

      // THEN
      expect(row).toBeUndefined()
    })

    it('should not return a row with a filter', async () => {
      // WHEN
      const row = await firstTable.read({
        field: 'name',
        operator: 'Is',
        value: 'Jane Doe',
      })

      // THEN
      expect(row).toBeUndefined()
    })

    it('should not return a row', async () => {
      // WHEN
      const row = await firstTable.read({
        field: 'name',
        operator: 'Is',
        value: 'Jane Doe',
      })

      // THEN
      expect(row).toBeUndefined()
    })
  })

  describe('list', () => {
    it('should return a list of rows with no filter', async () => {
      // WHEN
      const rows = await firstTable.list()

      // THEN
      expect(rows).toStrictEqual([
        {
          id: '1',
          fields: {
            name: 'John Doe',
            multiple_linked_record: [],
            number_rollup: 0,
            multiple_select: ['Red', 'Blue'],
          },
          created_at,
          updated_at,
        },
      ])
    })

    it('should return a list of rows with an empty "or" filter', async () => {
      // WHEN
      const rows = await firstTable.list({ or: [] })

      // THEN
      expect(rows).toHaveLength(1)
    })

    it('should return a list of rows with an empty "and" filter', async () => {
      // WHEN
      const rows = await firstTable.list({ and: [] })

      // THEN
      expect(rows).toHaveLength(1)
    })

    it('should return an empty list of rows with a filter', async () => {
      // WHEN
      const rows = await firstTable.list({
        field: 'name',
        operator: 'Is',
        value: 'Jane Doe',
      })

      // THEN
      expect(rows).toHaveLength(0)
    })
  })
}
