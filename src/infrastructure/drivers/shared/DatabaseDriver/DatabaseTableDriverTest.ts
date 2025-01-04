import type { IDatabaseTableDriver } from '@adapter/spi/drivers/DatabaseTableSpi'
import { getFirstAndSecondTableConfig } from '@test/config'
import BunTester from 'bun:test'

const {
  tables: [, secondTableConfig],
} = getFirstAndSecondTableConfig(['name', 'multiple_linked_record'])

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
  const date = new Date()

  beforeAll(async () => {
    const tables = await setup()
    firstTable = tables.firstTable
    secondTable = tables.secondTable
  })

  afterAll(async () => {
    if (teardown) await teardown()
  })

  describe('create', () => {
    afterAll(async () => {
      await firstTable.create()
    })

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
  })

  describe('createView', () => {
    afterAll(async () => {
      await firstTable.createView()
    })

    it('should create a view', async () => {
      // THEN
      expect(secondTable.createView()).resolves
    })

    it('should not create a view if already exist', async () => {
      // THEN
      expect(secondTable.createView()).rejects.toThrowError(
        `View "${secondTableConfig.name}_view" already exists`
      )
    })
  })

  describe('insert', () => {
    it('should insert a row', async () => {
      // WHEN
      await firstTable.insert({
        id: '1',
        fields: { name: 'John' },
        created_at: date,
      })
    })

    it('should return an error if a record id already exist', async () => {
      // WHEN
      const call = () =>
        firstTable.insert({
          id: '1',
          fields: { name: 'John' },
          created_at: date,
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
          created_at: date,
        })

      // THEN
      expect(call()).rejects.toThrowError('Invalid linked record')
    })

    it('should remove record created if a multiple linked record is not valid', async () => {
      // GIVEN
      await secondTable.insert({
        id: '1',
        fields: { name: 'Row 1' },
        created_at: date,
      })

      // WHEN
      await firstTable
        .insert({
          id: '2',
          fields: { multiple_linked_record: ['1', '2'] },
          created_at: date,
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
        updated_at: date,
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
        fields: { name: 'John Doe', multiple_linked_record: [] },
        created_at: date,
        updated_at: date,
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
          fields: { name: 'John Doe', multiple_linked_record: [] },
          created_at: date,
          updated_at: date,
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
