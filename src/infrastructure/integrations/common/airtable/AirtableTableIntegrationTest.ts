import { nanoid } from 'nanoid'
import { addDays, format, subDays } from 'date-fns'
import type { IAirtableIntegration } from '/adapter/spi/integrations/AirtableSpi'
import type BunTester from 'bun:test'
import type { IAirtableTableIntegration } from '/adapter/spi/integrations/AirtableTableSpi'
import type { AirtableTableSample1 } from '../../bun/mocks/airtable/AirtableTestSamples'

export function testAirtableTableIntegration(
  { describe, it, expect, afterAll, beforeAll }: typeof BunTester,
  integration: IAirtableIntegration,
  env: { TABLE_1_ID: string; TABLE_2_ID: string },
  teardown?: () => Promise<void>
) {
  const { TABLE_1_ID } = env

  if (teardown) afterAll(teardown)

  let table1: IAirtableTableIntegration<AirtableTableSample1>

  beforeAll(async () => {
    // GIVEN
    table1 = await integration.getTable<AirtableTableSample1>(TABLE_1_ID)
  })

  describe('insert', () => {
    it('should insert a record in a table', async () => {
      // WHEN
      const result = await table1.insert({
        name: nanoid(),
      })

      // THEN
      expect(result.data?.id).toBeDefined()
    })

    it('should throw an error if a field in not in the database schema', async () => {
      // WHEN
      const response = await table1.insert({
        name: nanoid(),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        invalid: 'invalid',
      })

      // THEN
      expect(response.error).toBeDefined()
      expect(response.error?.message).toBe('Field "invalid" not found in schema')
    })

    it('should insert a record in a table with a title field', async () => {
      // GIVEN
      const name = 'Hello World'

      // WHEN
      const result = await table1.insert({ name })

      // THEN
      expect(result.data?.fields.name).toBe(name)
    })

    it('should insert a record in a table with a number field', async () => {
      // GIVEN
      const number = 123

      // WHEN
      const result = await table1.insert({ number })

      // THEN
      expect(result.data?.fields.number).toBe(number)
    })

    it('should insert a record in a table with a number field from a string', async () => {
      // GIVEN
      const number = '123'

      // WHEN
      const result = await table1.insert({ number })

      // THEN
      expect(result.data?.fields.number as unknown as number).toBe(123)
    })

    it('should insert a record in a table with an empty number field', async () => {
      // WHEN
      const result = await table1.insert({ number: null })

      // THEN
      expect(result.data?.fields.number).toBeNull()
    })

    it('should insert a record in a table with a boolean field', async () => {
      // GIVEN
      const boolean = true

      // WHEN
      const result = await table1.insert({ boolean })

      // THEN
      expect(result.data?.fields.boolean).toBe(boolean)
    })

    it('should insert a record in a table with a boolean field from a string', async () => {
      // GIVEN
      const boolean = 'false'

      // WHEN
      const result = await table1.insert({ boolean })

      // THEN
      expect(result.data?.fields.boolean as unknown as boolean).toBe(false)
    })

    it('should insert a record in a table with a text field', async () => {
      // GIVEN
      const text =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

      // WHEN
      const result = await table1.insert({ text })

      // THEN
      expect(result.data?.fields.text).toBe(text)
    })

    it('should insert a record in a table with an empty text field', async () => {
      // WHEN
      const result = await table1.insert({ text: null })

      // THEN
      expect(result.data?.fields.text).toBeNull()
    })

    it('should insert a record in a table with an URL field', async () => {
      // GIVEN
      const url = 'https://example.com'

      // WHEN
      const result = await table1.insert({ url })

      // THEN
      expect(result.data?.fields.url).toBe(url)
    })

    it('should insert a record in a table with an empty URL field', async () => {
      // WHEN
      const result = await table1.insert({ url: null })

      // THEN
      expect(result.data?.fields.url).toBeNull()
    })

    it('should insert a record in a table with an email field', async () => {
      // GIVEN
      const email = 'test@test.com'

      // WHEN
      const result = await table1.insert({ email })

      // THEN
      expect(result.data?.fields.email).toBe(email)
    })

    it('should insert a record in a table with an empty email field', async () => {
      // WHEN
      const result = await table1.insert({ email: null })

      // THEN
      expect(result.data?.fields.email).toBeNull()
    })

    it('should insert a record in a table with an phone field', async () => {
      // GIVEN
      const phone = '+33612345678'

      // WHEN
      const result = await table1.insert({ phone })

      // THEN
      expect(result.data?.fields.phone).toBe(phone)
    })

    it('should insert a record in a table with an empty phone field', async () => {
      // WHEN
      const result = await table1.insert({ phone: null })

      // THEN
      expect(result.data?.fields.phone).toBeNull()
    })

    it('should insert a record in a table with a single_select field', async () => {
      // GIVEN
      const single_select = '1'

      // WHEN
      const result = await table1.insert({ single_select })

      // THEN
      expect(result.data?.fields.single_select).toBe(single_select)
    })

    it('should insert a record in a table with a multi_select field', async () => {
      // GIVEN
      const multi_select = ['1', '2']

      // WHEN
      const result = await table1.insert({ multi_select })

      // THEN
      expect(result.data?.fields.multi_select).toStrictEqual(multi_select)
    })

    it('should insert a record in a table with a date field', async () => {
      // GIVEN
      const date = new Date(2018, 8, 22, 15, 0, 0).toISOString()

      // WHEN
      const result = await table1.insert({ date })

      // THEN
      expect(result.data?.fields.date).toBe(date)
    })

    it('should insert a record in a table with a date field from a date string', async () => {
      // GIVEN
      const date = '2018-09-22'

      // WHEN
      const result = await table1.insert({ date })

      // THEN
      expect(result.data?.fields.date).toBe('2018-09-22T00:00:00.000Z')
    })

    it('should insert a record in a table with a date field from a date and time string', async () => {
      // GIVEN
      const date = '2018-09-22T15:00:00'

      // WHEN
      const result = await table1.insert({ date })

      // THEN
      expect(result.data?.fields.date).toBe('2018-09-22T15:00:00.000Z')
    })

    it('should insert a record in a table with a date field from a date, time and milliseconds string without Z', async () => {
      // GIVEN
      const date = '2018-09-22T15:00:00.000'

      // WHEN
      const result = await table1.insert({ date })

      // THEN
      expect(result.data?.fields.date).toBe('2018-09-22T15:00:00.000Z')
    })

    it('should insert a record in a table with a date field from a date, time and milliseconds string', async () => {
      // GIVEN
      const date = '2018-09-22T15:00:00.000Z'

      // WHEN
      const result = await table1.insert({ date })

      // THEN
      expect(result.data?.fields.date).toBe('2018-09-22T15:00:00.000Z')
    })

    it('should insert a record in a table with a date field from a timestamp', async () => {
      // GIVEN
      const date = new Date(2018, 8, 22)
      const timestamp = +date

      // WHEN
      const result = await table1.insert({ date: timestamp })

      // THEN
      expect(String(result.data?.fields.date)).toBe(date.toISOString())
    })

    it('should insert a record in a table with a date field and a null value', async () => {
      // GIVEN
      const date = null

      // WHEN
      const result = await table1.insert({ date })

      // THEN
      expect(result.data?.fields.date).toBeNull()
    })
  })

  describe('retrieve', () => {
    it('should retrieve a record in a table', async () => {
      // GIVEN
      const name = nanoid()
      const { data: { id } = {} } = await table1.insert({ name })
      if (!id) throw new Error('id is undefined')

      // WHEN
      const result = await table1.retrieve(id)

      // THEN
      expect(result.data?.fields.name).toBe(name)
    })

    it('should retrieve a record in a table with a created_time', async () => {
      // GIVEN
      const name = nanoid()
      const { data: { id } = {} } = await table1.insert({ name })
      if (!id) throw new Error('id is undefined')

      // WHEN
      const result = await table1.retrieve(id)

      // THEN
      expect(result.data?.created_time).toBeDefined()
    })
  })

  describe('update', () => {
    it('should update a record in a table with a title field', async () => {
      // GIVEN
      const { data: { id } = {} } = await table1.insert({ name: 'John' })
      if (!id) throw new Error('id is undefined')
      const name = 'John Doe'

      // WHEN
      const result = await table1.update(id, { name })

      // THEN
      expect(result.data?.fields.name).toBe(name)
    })

    it('should update a record in a table with a number field', async () => {
      // GIVEN
      const { data: { id } = {} } = await table1.insert({ number: 456 })
      if (!id) throw new Error('id is undefined')
      const number = 123

      // WHEN
      const result = await table1.update(id, { number })

      // THEN
      expect(result.data?.fields.number).toBe(number)
    })

    it('should update a record in a table with a boolean field', async () => {
      // GIVEN
      const { data: { id } = {} } = await table1.insert({ boolean: false })
      if (!id) throw new Error('id is undefined')
      const boolean = true

      // WHEN
      const result = await table1.update(id, { boolean })

      // THEN
      expect(result.data?.fields.boolean).toBe(boolean)
    })

    it('should update a record in a table with a text field', async () => {
      // GIVEN
      const { data: { id } = {} } = await table1.insert({
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      })
      if (!id) throw new Error('id is undefined')
      const text =
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

      // WHEN
      const result = await table1.update(id, { text })

      // THEN
      expect(result.data?.fields.text).toBe(text)
    })

    it('should update a record in a table with a single_select field', async () => {
      // GIVEN
      const { data: { id } = {} } = await table1.insert({ single_select: '1' })
      if (!id) throw new Error('id is undefined')
      const single_select = '2'

      // WHEN
      const result = await table1.update(id, { single_select })

      // THEN
      expect(result.data?.fields.single_select).toBe(single_select)
    })

    it('should update a record in a table with a multi_select field', async () => {
      // GIVEN
      const { data: { id } = {} } = await table1.insert({ multi_select: ['1', '2'] })
      if (!id) throw new Error('id is undefined')
      const multi_select = ['3', '4']

      // WHEN
      const result = await table1.update(id, { multi_select })

      // THEN
      expect(result.data?.fields.multi_select).toStrictEqual(multi_select)
    })

    it('should update a record in a table with a date field', async () => {
      // GIVEN
      const { data: { id } = {} } = await table1.insert({ date: '2000-01-01T00:00:00' })
      if (!id) throw new Error('id is undefined')
      const date = new Date(2018, 8, 22, 15, 0, 0).toISOString()

      // WHEN
      const result = await table1.update(id, { date })

      // THEN
      expect(result.data?.fields.date).toBe(date)
    })

    it('should update a record in a table with a date field and a null value', async () => {
      // GIVEN
      const { data: { id } = {} } = await table1.insert({ date: '2000-01-01T00:00:00' })
      if (!id) throw new Error('id is undefined')
      const date = null

      // WHEN
      const result = await table1.update(id, { date })

      // THEN
      expect(result.data?.fields.date).toBeNull()
    })
  })

  describe('insertMany', () => {
    it('should insert many records in a table with a title field', async () => {
      // WHEN
      const { data: records = [] } = await table1.insertMany([
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
      expect(records).toHaveLength(3)
    })
  })

  describe('updateMany', () => {
    it('should update many records in a table with a title field', async () => {
      // GIVEN
      const { data: recordInserted = [] } = await table1.insertMany([
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
      const { data: recordsUpdated = [] } = await table1.updateMany(
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
      const { data: { id } = {} } = await table1.insert({ name })
      if (!id) throw new Error('id is undefined')

      // WHEN
      await table1.delete(id)

      // THEN
      const result = await table1.retrieve(id)
      expect(result.error).toBeDefined()
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
      const { data: records = [] } = await table1.list({
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
      const { data: { id } = {} } = await table1.insert({ name })
      if (!id) throw new Error('id is undefined')

      // WHEN
      const response = await table1.list({
        field: 'invalid',
        operator: 'Is',
        value: id,
      })

      // THEN
      expect(response.error).toBeDefined()
      expect(response.error?.message).toBe('Field "invalid" does not exist')
    })

    it('should list records in a table with a Is filter', async () => {
      // GIVEN
      const name = nanoid()
      const { data: { id } = {} } = await table1.insert({ name })
      if (!id) throw new Error('id is undefined')

      // WHEN
      const { data: records = [] } = await table1.list({
        field: 'id',
        operator: 'Is',
        value: id,
      })

      // THEN
      expect(records).toHaveLength(1)
    })

    it('should list records in a table with multiple Is filters', async () => {
      // GIVEN
      const { data: { id: id1 } = {} } = await table1.insert({ name: nanoid() })
      if (!id1) throw new Error('id is undefined')
      const { data: { id: id2 } = {} } = await table1.insert({ name: nanoid() })
      if (!id2) throw new Error('id is undefined')
      const { data: { id: id3 } = {} } = await table1.insert({ name: nanoid() })
      if (!id3) throw new Error('id is undefined')

      // WHEN
      const { data: records = [] } = await table1.list({
        or: [
          {
            field: 'id',
            operator: 'Is',
            value: id1,
          },
          {
            field: 'id',
            operator: 'Is',
            value: id2,
          },
          {
            field: 'id',
            operator: 'Is',
            value: id3,
          },
        ],
      })

      // THEN
      expect(records).toHaveLength(3)
    })

    it('should list records in a table with a IsAfter filter', async () => {
      // GIVEN
      const { data: { id } = {} } = await table1.insert({ date: new Date().toISOString() })
      if (!id) throw new Error('id is undefined')
      const yesterday = format(subDays(new Date(), 1), 'yyyy-MM-dd') + 'T23:59:59'

      // WHEN
      const { data: records = [] } = await table1.list({
        and: [
          {
            field: 'id',
            operator: 'Is',
            value: id,
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

    it('should not list records in a table with a IsAfter filter', async () => {
      // GIVEN
      const { data: { id } = {} } = await table1.insert({ date: new Date().toISOString() })
      if (!id) throw new Error('id is undefined')
      const tomorrow = format(addDays(new Date(), 1), 'yyyy-MM-dd') + 'T23:59:59'

      // WHEN
      const { data: records = [] } = await table1.list({
        and: [
          {
            field: 'id',
            operator: 'Is',
            value: id,
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

    it('should list records in a table with a IsBefore filter', async () => {
      // GIVEN
      const { data: { id } = {} } = await table1.insert({ date: new Date().toISOString() })
      if (!id) throw new Error('id is undefined')
      const tomorrow = format(addDays(new Date(), 1), 'yyyy-MM-dd') + 'T23:59:59'

      // WHEN
      const { data: records = [] } = await table1.list({
        and: [
          {
            field: 'id',
            operator: 'Is',
            value: id,
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

    it('should not list records in a table with a IsBefore filter', async () => {
      // GIVEN
      const { data: { id } = {} } = await table1.insert({ date: new Date().toISOString() })
      if (!id) throw new Error('id is undefined')
      const yesterday = format(subDays(new Date(), 1), 'yyyy-MM-dd') + 'T23:59:59'

      // WHEN
      const { data: records = [] } = await table1.list({
        and: [
          {
            field: 'id',
            operator: 'Is',
            value: id,
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
      const { data: records = [] } = await table1.insertMany(values)

      // THEN
      expect(records).toHaveLength(100)
    })
  })
}
