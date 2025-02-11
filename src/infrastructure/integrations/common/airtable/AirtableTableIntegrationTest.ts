import { nanoid } from 'nanoid'
import { addDays, format, subDays } from 'date-fns'
import type { IAirtableIntegration } from '/adapter/spi/integrations/AirtableSpi'
import type BunTester from 'bun:test'
import type { IAirtableTableIntegration } from '/adapter/spi/integrations/AirtableTableSpi'

export function testAirtableTableIntegration(
  { describe, it, expect, afterAll, beforeAll }: typeof BunTester,
  integration: IAirtableIntegration,
  env: { TABLE_1_ID: string; TABLE_2_ID: string },
  teardown?: () => Promise<void>
) {
  const { TABLE_1_ID } = env

  if (teardown) afterAll(teardown)

  let table1: IAirtableTableIntegration

  beforeAll(async () => {
    // GIVEN
    table1 = await integration.getTable(TABLE_1_ID)
  })

  describe('insert', () => {
    it('should insert a record in a table', async () => {
      // WHEN
      const record = await table1.insert({
        name: nanoid(),
      })

      // THEN
      expect(record.id).toBeDefined()
    })

    it('should throw an error if a field in not in the database schema', async () => {
      // WHEN
      const call = () =>
        table1.insert({
          name: nanoid(),
          invalid: 'invalid',
        })

      // THEN
      expect(call()).rejects.toThrow('Field "invalid" not found in schema')
    })

    it('should insert a record in a table with a title field', async () => {
      // GIVEN
      const name = 'Hello World'

      // WHEN
      const record = await table1.insert({ name })

      // THEN
      expect(record.fields.name).toBe(name)
    })

    it('should insert a record in a table with a number field', async () => {
      // GIVEN
      const number = 123

      // WHEN
      const record = await table1.insert({ number })

      // THEN
      expect(record.fields.number).toBe(number)
    })

    it('should insert a record in a table with a number field from a string', async () => {
      // GIVEN
      const number = '123'

      // WHEN
      const record = await table1.insert({ number })

      // THEN
      expect(record.fields.number as unknown as number).toBe(123)
    })

    it('should insert a record in a table with an empty number field', async () => {
      // WHEN
      const record = await table1.insert({ number: null })

      // THEN
      expect(record.fields.number).toBeNull()
    })

    it('should insert a record in a table with a boolean field', async () => {
      // GIVEN
      const boolean = true

      // WHEN
      const record = await table1.insert({ boolean })

      // THEN
      expect(record.fields.boolean).toBe(boolean)
    })

    it('should insert a record in a table with a boolean field from a string', async () => {
      // GIVEN
      const boolean = 'false'

      // WHEN
      const record = await table1.insert({ boolean })

      // THEN
      expect(record.fields.boolean as unknown as boolean).toBe(false)
    })

    it('should insert a record in a table with a text field', async () => {
      // GIVEN
      const text =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

      // WHEN
      const record = await table1.insert({ text })

      // THEN
      expect(record.fields.text).toBe(text)
    })

    it('should insert a record in a table with an empty text field', async () => {
      // WHEN
      const record = await table1.insert({ text: null })

      // THEN
      expect(record.fields.text).toBeNull()
    })

    it('should insert a record in a table with an URL field', async () => {
      // GIVEN
      const url = 'https://example.com'

      // WHEN
      const record = await table1.insert({ url })

      // THEN
      expect(record.fields.url).toBe(url)
    })

    it('should insert a record in a table with an empty URL field', async () => {
      // WHEN
      const record = await table1.insert({ url: null })

      // THEN
      expect(record.fields.url).toBeNull()
    })

    it('should insert a record in a table with an email field', async () => {
      // GIVEN
      const email = 'test@test.com'

      // WHEN
      const record = await table1.insert({ email })

      // THEN
      expect(record.fields.email).toBe(email)
    })

    it('should insert a record in a table with an empty email field', async () => {
      // WHEN
      const record = await table1.insert({ email: null })

      // THEN
      expect(record.fields.email).toBeNull()
    })

    it('should insert a record in a table with an phone field', async () => {
      // GIVEN
      const phone = '+33612345678'

      // WHEN
      const record = await table1.insert({ phone })

      // THEN
      expect(record.fields.phone).toBe(phone)
    })

    it('should insert a record in a table with an empty phone field', async () => {
      // WHEN
      const record = await table1.insert({ phone: null })

      // THEN
      expect(record.fields.phone).toBeNull()
    })

    it('should insert a record in a table with a single_select field', async () => {
      // GIVEN
      const single_select = '1'

      // WHEN
      const record = await table1.insert({ single_select })

      // THEN
      expect(record.fields.single_select).toBe(single_select)
    })

    it('should insert a record in a table with a multi_select field', async () => {
      // GIVEN
      const multi_select = ['1', '2']

      // WHEN
      const record = await table1.insert({ multi_select })

      // THEN
      expect(record.fields.multi_select).toStrictEqual(multi_select)
    })

    it('should insert a record in a table with a date field', async () => {
      // GIVEN
      const date = new Date(2018, 8, 22, 15, 0, 0).toISOString()

      // WHEN
      const record = await table1.insert({ date })

      // THEN
      expect(record.fields.date).toBe(date)
    })

    it('should insert a record in a table with a date field from a date string', async () => {
      // GIVEN
      const date = '2018-09-22'

      // WHEN
      const record = await table1.insert({ date })

      // THEN
      expect(record.fields.date).toBe('2018-09-22T00:00:00.000Z')
    })

    it('should insert a record in a table with a date field from a date and time string', async () => {
      // GIVEN
      const date = '2018-09-22T15:00:00'

      // WHEN
      const record = await table1.insert({ date })

      // THEN
      expect(record.fields.date).toBe('2018-09-22T15:00:00.000Z')
    })

    it('should insert a record in a table with a date field from a date, time and milliseconds string without Z', async () => {
      // GIVEN
      const date = '2018-09-22T15:00:00.000'

      // WHEN
      const record = await table1.insert({ date })

      // THEN
      expect(record.fields.date).toBe('2018-09-22T15:00:00.000Z')
    })

    it('should insert a record in a table with a date field from a date, time and milliseconds string', async () => {
      // GIVEN
      const date = '2018-09-22T15:00:00.000Z'

      // WHEN
      const record = await table1.insert({ date })

      // THEN
      expect(record.fields.date).toBe('2018-09-22T15:00:00.000Z')
    })

    it('should insert a record in a table with a date field from a timestamp', async () => {
      // GIVEN
      const date = new Date(2018, 8, 22)
      const timestamp = +date

      // WHEN
      const record = await table1.insert({ date: timestamp })

      // THEN
      expect(String(record.fields.date)).toBe(date.toISOString())
    })

    it('should insert a record in a table with a date field and a null value', async () => {
      // GIVEN
      const date = null

      // WHEN
      const record = await table1.insert({ date })

      // THEN
      expect(record.fields.date).toBeNull()
    })
  })

  describe('retrieve', () => {
    it('should retrieve a record in a table', async () => {
      // GIVEN
      const name = nanoid()
      const { id } = await table1.insert({ name })

      // WHEN
      const record = await table1.retrieve(id)

      // THEN
      expect(record.fields.name).toBe(name)
    })

    it('should retrieve a record in a table with a created_time', async () => {
      // GIVEN
      const name = nanoid()
      const { id } = await table1.insert({ name })

      // WHEN
      const record = await table1.retrieve(id)

      // THEN
      expect(record.created_time).toBeDefined()
    })
  })

  describe('update', () => {
    it('should update a record in a table with a title field', async () => {
      // GIVEN
      const { id } = await table1.insert({ name: 'John' })
      const name = 'John Doe'

      // WHEN
      const record = await table1.update(id, { name })

      // THEN
      expect(record.fields.name).toBe(name)
    })

    it('should update a record in a table with a number field', async () => {
      // GIVEN
      const { id } = await table1.insert({ number: 456 })
      const number = 123

      // WHEN
      const record = await table1.update(id, { number })

      // THEN
      expect(record.fields.number).toBe(number)
    })

    it('should update a record in a table with a boolean field', async () => {
      // GIVEN
      const { id } = await table1.insert({ boolean: false })
      const boolean = true

      // WHEN
      const record = await table1.update(id, { boolean })

      // THEN
      expect(record.fields.boolean).toBe(boolean)
    })

    it('should update a record in a table with a text field', async () => {
      // GIVEN
      const { id } = await table1.insert({
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      })
      const text =
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

      // WHEN
      const record = await table1.update(id, { text })

      // THEN
      expect(record.fields.text).toBe(text)
    })

    it('should update a record in a table with a single_select field', async () => {
      // GIVEN
      const { id } = await table1.insert({ single_select: '1' })
      const single_select = '2'

      // WHEN
      const record = await table1.update(id, { single_select })

      // THEN
      expect(record.fields.single_select).toBe(single_select)
    })

    it('should update a record in a table with a multi_select field', async () => {
      // GIVEN
      const { id } = await table1.insert({ multi_select: ['1', '2'] })
      const multi_select = ['3', '4']

      // WHEN
      const record = await table1.update(id, { multi_select })

      // THEN
      expect(record.fields.multi_select).toStrictEqual(multi_select)
    })

    it('should update a record in a table with a date field', async () => {
      // GIVEN
      const { id } = await table1.insert({ date: '2000-01-01T00:00:00' })
      const date = new Date(2018, 8, 22, 15, 0, 0).toISOString()

      // WHEN
      const record = await table1.update(id, { date })

      // THEN
      expect(record.fields.date).toBe(date)
    })

    it('should update a record in a table with a date field and a null value', async () => {
      // GIVEN
      const { id } = await table1.insert({ date: '2000-01-01T00:00:00' })
      const date = null

      // WHEN
      const record = await table1.update(id, { date })

      // THEN
      expect(record.fields.date).toBeNull()
    })
  })

  describe('insertMany', () => {
    it('should insert many records in a table with a title field', async () => {
      // WHEN
      const ids = await table1.insertMany([
        {
          name: nanoid(),
        },
        {
          name: nanoid(),
        },
        {
          name: nanoid(),
        },
      ])

      // THEN
      expect(ids).toHaveLength(3)
    })
  })

  describe('updateMany', () => {
    it('should update many records in a table with a title field', async () => {
      // GIVEN
      const recordInserted = await table1.insertMany([
        {
          name: '1',
        },
        {
          name: '2',
        },
        {
          name: '3',
        },
      ])

      // WHEN
      const recordsUpdated = await table1.updateMany(
        recordInserted.map((record) => ({ id: record.id, fields: { name: 'John Doe' } }))
      )

      // THEN
      expect(recordsUpdated.map((p) => p.fields.name)).toStrictEqual([
        'John Doe',
        'John Doe',
        'John Doe',
      ])
    })
  })

  describe('delete', () => {
    it('should delete a record in a table', async () => {
      // GIVEN
      const name = nanoid()
      const { id } = await table1.insert({ name })

      // WHEN
      await table1.delete(id)

      // THEN
      expect(table1.retrieve(id)).rejects.toThrow()
    })
  })

  describe('list', () => {
    it('should list records in a table', async () => {
      // GIVEN
      const values = [
        {
          name: nanoid(),
        },
        {
          name: nanoid(),
        },
        {
          name: nanoid(),
        },
      ]
      await table1.insertMany(values)

      // WHEN
      const records = await table1.list({
        or: values.map((value) => ({
          field: 'name',
          operator: 'Is',
          value: value.name,
        })),
      })

      // THEN
      expect(records).toHaveLength(3)
    })

    it('should throw an error if filter field does not exist', async () => {
      // GIVEN
      const name = nanoid()
      const record = await table1.insert({ name })

      // WHEN
      const call = async () =>
        table1.list({
          field: 'invalid',
          operator: 'Is',
          value: record.id,
        })

      // THEN
      expect(call()).rejects.toThrow('Field "invalid" does not exist')
    })

    it('should list records in a table with a Is filter on a formula', async () => {
      // GIVEN
      const name = nanoid()
      const record = await table1.insert({ name })

      // WHEN
      const records = await table1.list({
        field: 'id',
        operator: 'Is',
        value: record.id,
      })

      // THEN
      expect(records).toHaveLength(1)
    })

    it('should list records in a table with a IsAfter filter on a formula', async () => {
      // GIVEN
      const record = await table1.insert({ date: new Date().toISOString() })
      const yesterday = format(subDays(new Date(), 1), 'yyyy-MM-dd') + 'T23:59:59'

      // WHEN
      const records = await table1.list({
        and: [
          {
            field: 'id',
            operator: 'Is',
            value: record.id,
          },
          {
            field: 'date',
            operator: 'IsAfter',
            value: yesterday,
          },
        ],
      })

      // THEN
      expect(records).toHaveLength(1)
    })

    it('should not list records in a table with a IsAfter filter on a formula', async () => {
      // GIVEN
      const record = await table1.insert({ date: new Date().toISOString() })
      const tomorrow = format(addDays(new Date(), 1), 'yyyy-MM-dd') + 'T23:59:59'

      // WHEN
      const records = await table1.list({
        and: [
          {
            field: 'id',
            operator: 'Is',
            value: record.id,
          },
          {
            field: 'date',
            operator: 'IsAfter',
            value: tomorrow,
          },
        ],
      })

      // THEN
      expect(records).toHaveLength(0)
    })

    it('should list records in a table with a IsBefore filter on a formula', async () => {
      // GIVEN
      const record = await table1.insert({ date: new Date().toISOString() })
      const tomorrow = format(addDays(new Date(), 1), 'yyyy-MM-dd') + 'T23:59:59'

      // WHEN
      const records = await table1.list({
        and: [
          {
            field: 'id',
            operator: 'Is',
            value: record.id,
          },
          {
            field: 'date',
            operator: 'IsBefore',
            value: tomorrow,
          },
        ],
      })

      // THEN
      expect(records).toHaveLength(1)
    })

    it('should not list records in a table with a IsBefore filter on a formula', async () => {
      // GIVEN
      const record = await table1.insert({ date: new Date().toISOString() })
      const yesterday = format(subDays(new Date(), 1), 'yyyy-MM-dd') + 'T23:59:59'

      // WHEN
      const records = await table1.list({
        and: [
          {
            field: 'id',
            operator: 'Is',
            value: record.id,
          },
          {
            field: 'date',
            operator: 'IsBefore',
            value: yesterday,
          },
        ],
      })

      // THEN
      expect(records).toHaveLength(0)
    })
  })

  describe('stress test', () => {
    it('should allow 100 requests in few seconds', async () => {
      // GIVEN
      const values = Array.from({ length: 100 }, () => ({
        name: nanoid(),
      }))

      // WHEN
      const records = await table1.insertMany(values)

      // THEN
      expect(records).toHaveLength(100)
    })
  })
}
