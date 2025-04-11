import { nanoid } from 'nanoid'
import { parse } from 'date-fns'
import type { INotionIntegration } from '/adapter/spi/integrations/NotionSpi'
import type BunTester from 'bun:test'
import type { INotionTableIntegration } from '/adapter/spi/integrations/NotionTableSpi'
import type {
  NotionTableSample1,
  NotionTableSample2,
  NotionTableSample3,
} from '../../bun/mocks/notion/NotionTestSamples'

export function testNotionTableIntegration(
  { describe, it, expect, afterAll, beforeAll }: typeof BunTester,
  integration: INotionIntegration,
  env: { TABLE_1_ID: string; TABLE_2_ID: string; TABLE_3_ID: string },
  teardown?: () => Promise<void>
) {
  const { TABLE_1_ID, TABLE_2_ID, TABLE_3_ID } = env

  if (teardown) afterAll(teardown)

  let table1: INotionTableIntegration<NotionTableSample1>
  let table2: INotionTableIntegration<NotionTableSample2>
  let table3: INotionTableIntegration<NotionTableSample3>

  beforeAll(async () => {
    // GIVEN
    table1 = await integration.getTable<NotionTableSample1>(TABLE_1_ID)
    table2 = await integration.getTable<NotionTableSample2>(TABLE_2_ID)
    table3 = await integration.getTable<NotionTableSample3>(TABLE_3_ID)
  })

  describe('insert', () => {
    it('should insert a page in a table', async () => {
      // WHEN
      const response = await table1.insert({
        name: nanoid(),
      })
      if (response.error) throw response.error

      // THEN
      expect(response.data.id).toBeDefined()
    })

    it('should insert a page in a table with a title property', async () => {
      // GIVEN
      const name = 'Hello World'

      // WHEN
      const response = await table1.insert({ name })
      if (response.error) throw response.error

      // THEN
      expect(response.data.properties.name).toBe(name)
    })

    it('should insert a page in a table with a number property', async () => {
      // GIVEN
      const number = 123

      // WHEN
      const response = await table1.insert({ number })
      if (response.error) throw response.error

      // THEN
      expect(response.data.properties.number).toBe(number)
    })

    it('should insert a page in a table with a number property from a string', async () => {
      // GIVEN
      const number = '123'

      // WHEN
      const response = await table1.insert({ number })
      if (response.error) throw response.error

      // THEN
      expect(response.data.properties.number as unknown as number).toBe(123)
    })

    it('should insert a page in a table with an empty number property', async () => {
      // WHEN
      const response = await table1.insert({ number: null })
      if (response.error) throw response.error

      // THEN
      expect(response.data.properties.number).toBeNull()
    })

    it('should insert a page in a table with a boolean property', async () => {
      // GIVEN
      const boolean = true

      // WHEN
      const response = await table1.insert({ boolean })
      if (response.error) throw response.error

      // THEN
      expect(response.data.properties.boolean).toBe(boolean)
    })

    it('should insert a page in a table with a boolean property from a string', async () => {
      // GIVEN
      const boolean = 'false'

      // WHEN
      const response = await table1.insert({ boolean })
      if (response.error) throw response.error

      // THEN
      expect(response.data.properties.boolean as unknown as boolean).toBe(false)
    })

    it('should insert a page in a table with a text property', async () => {
      // GIVEN
      const text =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

      // WHEN
      const response = await table1.insert({ text })
      if (response.error) throw response.error

      // THEN
      expect(response.data.properties.text).toBe(text)
    })

    it('should insert a page in a table with a text property named with specials characters', async () => {
      // GIVEN
      const name = 'App'

      // WHEN
      const response = await table3.insert({ ['[App] Nom']: name })
      if (response.error) throw response.error

      // THEN
      expect(response.data.properties['[App] Nom']).toBe(name)
    })

    it('should insert a page in a table with an empty text property', async () => {
      // WHEN
      const response = await table1.insert({ text: null })
      if (response.error) throw response.error

      // THEN
      expect(response.data.properties.text).toBeNull()
    })

    it('should insert a page in a table with an URL property', async () => {
      // GIVEN
      const url = 'https://example.com'

      // WHEN
      const response = await table1.insert({ url })
      if (response.error) throw response.error

      // THEN
      expect(response.data.properties.url).toBe(url)
    })

    it('should insert a page in a table with an empty URL property', async () => {
      // WHEN
      const response = await table1.insert({ url: null })
      if (response.error) throw response.error

      // THEN
      expect(response.data.properties.url).toBeNull()
    })

    it('should insert a page in a table with an email property', async () => {
      // GIVEN
      const email = 'test@test.com'

      // WHEN
      const response = await table1.insert({ email })
      if (response.error) throw response.error

      // THEN
      expect(response.data.properties.email).toBe(email)
    })

    it('should insert a page in a table with an empty email property', async () => {
      // WHEN
      const response = await table1.insert({ email: null })
      if (response.error) throw response.error

      // THEN
      expect(response.data.properties.email).toBeNull()
    })

    it('should insert a page in a table with an phone property', async () => {
      // GIVEN
      const phone = '+33612345678'

      // WHEN
      const response = await table1.insert({ phone })
      if (response.error) throw response.error

      // THEN
      expect(response.data.properties.phone).toBe(phone)
    })

    it('should insert a page in a table with an empty phone property', async () => {
      // WHEN
      const response = await table1.insert({ phone: null })
      if (response.error) throw response.error

      // THEN
      expect(response.data.properties.phone).toBeNull()
    })

    it('should insert a page in a table with a single_select property', async () => {
      // GIVEN
      const single_select = '1'

      // WHEN
      const response = await table1.insert({ single_select })
      if (response.error) throw response.error

      // THEN
      expect(response.data.properties.single_select).toBe(single_select)
    })

    it('should insert a page in a table with a status property', async () => {
      // GIVEN
      const status = 'En cours'

      // WHEN
      const response = await table1.insert({ status })
      if (response.error) throw response.error

      // THEN
      expect(response.data.properties.status).toBe(status)
    })

    it('should insert a page in a table with a multi_select property', async () => {
      // GIVEN
      const multi_select = ['1', '2']

      // WHEN
      const response = await table1.insert({ multi_select })
      if (response.error) throw response.error

      // THEN
      expect(response.data.properties.multi_select).toStrictEqual(multi_select)
    })

    it('should insert a page in a table with a date property', async () => {
      // GIVEN
      const date = new Date(2018, 8, 22, 15, 0, 0)

      // WHEN
      const response = await table1.insert({ date })
      if (response.error) throw response.error

      // THEN
      expect(response.data.properties.date?.toString()).toBe(date.toString())
    })

    it('should insert a page in a table with a date property from a date string', async () => {
      // GIVEN
      const date = '2018-09-22'

      // WHEN
      const response = await table1.insert({ date })
      if (response.error) throw response.error

      // THEN
      expect(response.data.properties.date as unknown as Date).toStrictEqual(
        parse(date, 'yyyy-MM-dd', new Date())
      )
    })

    it('should insert a page in a table with a date property from a date and time string', async () => {
      // GIVEN
      const date = '2018-09-22T15:00:00'

      // WHEN
      const response = await table1.insert({ date })
      if (response.error) throw response.error

      // THEN
      expect(response.data.properties.date as unknown as Date).toStrictEqual(
        parse(date, "yyyy-MM-dd'T'HH:mm:ss", new Date())
      )
    })

    it('should insert a page in a table with a date property from a date, time and milliseconds string', async () => {
      // GIVEN
      const date = '2018-09-22T15:00:00.000Z'

      // WHEN
      const response = await table1.insert({ date })
      if (response.error) throw response.error

      // THEN
      expect(response.data.properties.date as unknown as Date).toStrictEqual(
        parse(date, "yyyy-MM-dd'T'HH:mm:ss.SSSX", new Date())
      )
    })

    it('should insert a page in a table with a date property from a timestamp', async () => {
      // GIVEN
      const date = new Date(2018, 8, 22)
      const timestamp = +date

      // WHEN
      const response = await table1.insert({ date: timestamp })
      if (response.error) throw response.error

      // THEN
      expect(response.data.properties.date?.toString()).toBe(date.toString())
    })

    it('should insert a page in a table with a date property and a null value', async () => {
      // GIVEN
      const date = null

      // WHEN
      const response = await table1.insert({ date })
      if (response.error) throw response.error

      // THEN
      expect(response.data.properties.date).toBeNull()
    })

    it('should insert a page in a table with a people property', async () => {
      // GIVEN
      const usersResponse = await integration.listAllUsers()
      if (usersResponse.error) throw usersResponse.error
      const [{ id }] = usersResponse.data

      // WHEN
      const response = await table1.insert({ people: [id] })
      if (response.error) throw response.error

      // THEN
      expect(response.data.properties.people).toStrictEqual([id])
    })

    it('should insert a page in a table with a files property', async () => {
      // GIVEN
      const files = [
        {
          name: 'John Doe',
          url: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb',
        },
      ]

      // WHEN
      const response = await table1.insert({ files })
      if (response.error) throw response.error

      // THEN
      expect(response.data.properties.files).toStrictEqual(files)
    })

    it('should insert a page in a table with a single relation', async () => {
      // GIVEN
      const recordResponse = await table2.insert({ name: 'John Doe' })
      if (recordResponse.error) throw recordResponse.error

      // WHEN
      const response = await table1.insert({ single_relation: [recordResponse.data.id] })
      if (response.error) throw response.error

      // THEN
      expect(response.data.properties.single_relation).toStrictEqual([recordResponse.data.id])
    })

    it('should insert a page in a table with a multiple relation', async () => {
      // GIVEN
      const record1Response = await table2.insert({ name: 'John Doe' })
      if (record1Response.error) throw record1Response.error
      const record2Response = await table2.insert({ name: 'Jane Doe' })
      if (record2Response.error) throw record2Response.error

      // WHEN
      const response = await table1.insert({
        multi_relation: [record1Response.data.id, record2Response.data.id],
      })
      if (response.error) throw response.error

      // THEN
      expect(response.data.properties.multi_relation).toStrictEqual([
        record1Response.data.id,
        record2Response.data.id,
      ])
    })
  })

  describe('retrieve', () => {
    it('should retrieve a page in a table', async () => {
      // GIVEN
      const name = nanoid()
      const insertResponse = await table1.insert({ name })
      if (insertResponse.error) throw insertResponse.error

      // WHEN
      const response = await table1.retrieve(insertResponse.data.id)
      if (response.error) throw response.error

      // THEN
      expect(response.data.properties.name).toBe(name)
    })

    it('should retrieve a page in a table with a created_time', async () => {
      // GIVEN
      const name = nanoid()
      const insertResponse = await table1.insert({ name })
      if (insertResponse.error) throw insertResponse.error

      // WHEN
      const response = await table1.retrieve(insertResponse.data.id)
      if (response.error) throw response.error

      // THEN
      expect(response.data.created_time).toBeDefined()
    })

    it('should retrieve a page in a table with a last_edited_time', async () => {
      // GIVEN
      const name = nanoid()
      const insertResponse = await table1.insert({ name })
      if (insertResponse.error) throw insertResponse.error

      // WHEN
      const response = await table1.retrieve(insertResponse.data.id)
      if (response.error) throw response.error

      // THEN
      expect(response.data.last_edited_time).toBeDefined()
    })

    it('should retrieve an archived page in a table', async () => {
      // GIVEN
      const name = nanoid()
      const insertResponse = await table1.insert({ name })
      if (insertResponse.error) throw insertResponse.error
      const archiveResponse = await table1.archive(insertResponse.data.id)
      if (archiveResponse.error) throw archiveResponse.error

      // WHEN
      const response = await table1.retrieve(insertResponse.data.id)
      if (response.error) throw response.error

      // THEN
      expect(response.data.archived).toBeTruthy()
    })
  })

  describe('update', () => {
    it('should update a page in a table with a title property', async () => {
      // GIVEN
      const insertResponse = await table1.insert({ name: 'John' })
      if (insertResponse.error) throw insertResponse.error
      const name = 'John Doe'

      // WHEN
      const response = await table1.update(insertResponse.data.id, { name })
      if (response.error) throw response.error

      // THEN
      expect(response.data.properties.name).toBe(name)
    })

    it('should update a page in a table with a number property', async () => {
      // GIVEN
      const insertResponse = await table1.insert({ number: 456 })
      if (insertResponse.error) throw insertResponse.error
      const number = 123

      // WHEN
      const response = await table1.update(insertResponse.data.id, { number })
      if (response.error) throw response.error

      // THEN
      expect(response.data.properties.number).toBe(number)
    })

    it('should update a page in a table with a boolean property', async () => {
      // GIVEN
      const insertResponse = await table1.insert({ boolean: false })
      if (insertResponse.error) throw insertResponse.error
      const boolean = true

      // WHEN
      const response = await table1.update(insertResponse.data.id, { boolean })
      if (response.error) throw response.error

      // THEN
      expect(response.data.properties.boolean).toBe(boolean)
    })

    it('should update a page in a table with a text property', async () => {
      // GIVEN
      const insertResponse = await table1.insert({
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      })
      if (insertResponse.error) throw insertResponse.error
      const text =
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

      // WHEN
      const response = await table1.update(insertResponse.data.id, { text })
      if (response.error) throw response.error

      // THEN
      expect(response.data.properties.text).toBe(text)
    })

    it('should update a page in a table with a single_select property', async () => {
      // GIVEN
      const insertResponse = await table1.insert({ single_select: '1' })
      if (insertResponse.error) throw insertResponse.error
      const single_select = '2'

      // WHEN
      const response = await table1.update(insertResponse.data.id, { single_select })
      if (response.error) throw response.error

      // THEN
      expect(response.data.properties.single_select).toBe(single_select)
    })

    it('should update a page in a table with a status property', async () => {
      // GIVEN
      const insertResponse = await table1.insert({ status: 'Pas commencé' })
      if (insertResponse.error) throw insertResponse.error
      const status = 'En cours'

      // WHEN
      const response = await table1.update(insertResponse.data.id, { status })
      if (response.error) throw response.error

      // THEN
      expect(response.data.properties.status).toBe(status)
    })

    it('should update a page in a table with a multi_select property', async () => {
      // GIVEN
      const insertResponse = await table1.insert({ multi_select: ['1', '2'] })
      if (insertResponse.error) throw insertResponse.error
      const multi_select = ['3', '4']

      // WHEN
      const response = await table1.update(insertResponse.data.id, { multi_select })
      if (response.error) throw response.error

      // THEN
      expect(response.data.properties.multi_select).toStrictEqual(multi_select)
    })

    it('should update a page in a table with a date property', async () => {
      // GIVEN
      const insertResponse = await table1.insert({ date: new Date(2000) })
      if (insertResponse.error) throw insertResponse.error
      const date = new Date(2018, 8, 22, 15, 0, 0)

      // WHEN
      const response = await table1.update(insertResponse.data.id, { date })
      if (response.error) throw response.error

      // THEN
      expect(response.data.properties.date?.toString()).toBe(date.toString())
    })

    it('should update a page in a table with a date property and a null value', async () => {
      // GIVEN
      const insertResponse = await table1.insert({ date: new Date(2000) })
      if (insertResponse.error) throw insertResponse.error
      const date = null

      // WHEN
      const response = await table1.update(insertResponse.data.id, { date })
      if (response.error) throw response.error

      // THEN
      expect(response.data.properties.date).toBeNull()
    })

    it('should update a page in a table with a people property', async () => {
      // GIVEN
      const usersResponse = await integration.listAllUsers()
      if (usersResponse.error) throw usersResponse.error
      const [{ id: peopleId }] = usersResponse.data
      const insertResponse = await table1.insert({ people: [] })
      if (insertResponse.error) throw insertResponse.error

      // WHEN
      const response = await table1.update(insertResponse.data.id, { people: [peopleId] })
      if (response.error) throw response.error

      // THEN
      expect(response.data.properties.people).toStrictEqual([peopleId])
    })

    it('should update a page in a table with a files property', async () => {
      // GIVEN
      const files = [
        {
          name: 'John Doe',
          url: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb',
        },
      ]
      const insertResponse = await table1.insert({ files: [] })
      if (insertResponse.error) throw insertResponse.error

      // WHEN
      const response = await table1.update(insertResponse.data.id, { files })
      if (response.error) throw response.error

      // THEN
      expect(response.data.properties.files).toStrictEqual(files)
    })
  })

  describe('insertMany', () => {
    it('should insert many pages in a table with a title property', async () => {
      // WHEN
      const response = await table1.insertMany([
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
      if (response.error) throw response.error

      // THEN
      expect(response.data).toHaveLength(3)
    })
  })

  describe('updateMany', () => {
    it('should update many pages in a table with a title property', async () => {
      // GIVEN
      const insertResponse = await table1.insertMany([
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
      if (insertResponse.error) throw insertResponse.error

      // WHEN
      const response = await table1.updateMany(
        insertResponse.data.map((page) => ({ id: page.id, page: { name: 'John Doe' } }))
      )
      if (response.error) throw response.error

      // THEN
      expect(response.data.map((p) => p.properties.name)).toStrictEqual([
        'John Doe',
        'John Doe',
        'John Doe',
      ])
    })
  })

  describe('archive', () => {
    it('should archive a page in a table', async () => {
      // GIVEN
      const name = nanoid()
      const insertResponse = await table1.insert({ name })
      if (insertResponse.error) throw insertResponse.error

      // WHEN
      const archiveResponse = await table1.archive(insertResponse.data.id)
      if (archiveResponse.error) throw archiveResponse.error

      // THEN
      const response = await table1.retrieve(insertResponse.data.id)
      if (response.error) throw response.error
      expect(response.data.archived).toBe(true)
    })
  })

  describe('list', () => {
    it('should list pages in a table', async () => {
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
      const insertResponse = await table1.insertMany(values)
      if (insertResponse.error) throw insertResponse.error

      // WHEN
      const response = await table1.list({
        or: values.map((value) => ({
          field: 'name',
          operator: 'Is',
          value: value.name,
        })),
      })
      if (response.error) throw response.error

      // THEN
      expect(response.data).toHaveLength(3)
    })

    it('should list pages in a table with a OnOrAfter string filter', async () => {
      // GIVEN
      const now = new Date()
      now.setMinutes(now.getMinutes() - 1)
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
      const insertResponse = await table1.insertMany(values)
      if (insertResponse.error) throw insertResponse.error

      // WHEN
      const response = await table1.list({
        and: [
          {
            field: 'created_time',
            operator: 'OnOrAfter',
            value: now.toISOString(),
          },
          {
            or: values.map((value) => ({
              field: 'name',
              operator: 'Is',
              value: value.name,
            })),
          },
        ],
      })
      if (response.error) throw response.error

      // THEN
      expect(response.data).toHaveLength(3)
    })

    it('should throw an error if filter field does not exist', async () => {
      // GIVEN
      const name = nanoid()
      const insertResponse = await table1.insert({ name })
      if (insertResponse.error) throw insertResponse.error

      // WHEN
      const call = async () =>
        table1.list({
          field: 'invalid',
          operator: 'Is',
          value: insertResponse.data.id,
        })

      // THEN
      await expect(call()).rejects.toThrow('Field "invalid" does not exist')
    })

    it('should list pages in a table with a Is filter on a formula', async () => {
      // GIVEN
      const name = nanoid()
      const insertResponse = await table1.insert({ name })
      if (insertResponse.error) throw insertResponse.error

      // WHEN
      const response = await table1.list({
        field: 'id',
        operator: 'Is',
        value: insertResponse.data.id,
      })
      if (response.error) throw response.error

      // THEN
      expect(response.data).toHaveLength(1)
    })

    it('should list pages in a table with a Contains filter on a rollup', async () => {
      // GIVEN
      const name = nanoid()
      const table2Response = await table2.insert({ name })
      if (table2Response.error) throw table2Response.error
      const insertResponse = await table1.insert({
        name: nanoid(),
        multi_relation: [table2Response.data.id],
      })
      if (insertResponse.error) throw insertResponse.error

      // WHEN
      const response = await table1.list({
        field: 'rollup_names',
        operator: 'Contains',
        value: name,
      })
      if (response.error) throw response.error

      // THEN
      expect(response.data).toHaveLength(1)
    })

    it('should list pages in a table with a Is filter on a single select', async () => {
      // GIVEN
      const status = 'Terminé'
      const insertResponse = await table1.insert({ status })
      if (insertResponse.error) throw insertResponse.error

      // WHEN
      const response = await table1.list({
        field: 'status',
        operator: 'Is',
        value: status,
      })
      if (response.error) throw response.error

      // THEN
      expect(response.data).toHaveLength(1)
    })
  })

  describe('stress test', () => {
    it('should allow 100 requests in few seconds', async () => {
      // GIVEN
      const values = Array.from({ length: 100 }, () => ({
        name: nanoid(),
      }))

      // WHEN
      const response = await table1.insertMany(values)
      if (response.error) throw response.error

      // THEN
      expect(response.data).toHaveLength(100)
    })
  })
}
