import { nanoid } from 'nanoid'
import { parse } from 'date-fns'
import type { INotionIntegration } from '/adapter/spi/integrations/NotionSpi'
import type BunTester from 'bun:test'
import type { INotionTableIntegration } from '/adapter/spi/integrations/NotionTableSpi'

export function testNotionTableIntegration(
  { describe, it, expect, afterAll, beforeAll }: typeof BunTester,
  integration: INotionIntegration,
  env: { TABLE_1_ID: string; TABLE_2_ID: string },
  teardown?: () => Promise<void>
) {
  const { TABLE_1_ID, TABLE_2_ID } = env

  if (teardown) afterAll(teardown)

  let table1: INotionTableIntegration

  beforeAll(async () => {
    // GIVEN
    table1 = await integration.getTable(TABLE_1_ID)
  })

  describe('insert', () => {
    it('should insert a page in a table', async () => {
      // WHEN
      const page = await table1.insert({
        name: nanoid(),
      })

      // THEN
      expect(page.id).toBeDefined()
    })

    it('should insert a page in a table with a title property', async () => {
      // GIVEN
      const name = 'Hello World'

      // WHEN
      const page = await table1.insert({ name })

      // THEN
      expect(page.properties.name).toBe(name)
    })

    it('should insert a page in a table with a number property', async () => {
      // GIVEN
      const number = 123

      // WHEN
      const page = await table1.insert({ number })

      // THEN
      expect(page.properties.number).toBe(number)
    })

    it('should insert a page in a table with a number property from a string', async () => {
      // GIVEN
      const number = '123'

      // WHEN
      const page = await table1.insert({ number })

      // THEN
      expect(page.properties.number as unknown as number).toBe(123)
    })

    it('should insert a page in a table with an empty number property', async () => {
      // WHEN
      const page = await table1.insert({ number: null })

      // THEN
      expect(page.properties.number).toBeNull()
    })

    it('should insert a page in a table with a boolean property', async () => {
      // GIVEN
      const boolean = true

      // WHEN
      const page = await table1.insert({ boolean })

      // THEN
      expect(page.properties.boolean).toBe(boolean)
    })

    it('should insert a page in a table with a boolean property from a string', async () => {
      // GIVEN
      const boolean = 'false'

      // WHEN
      const page = await table1.insert({ boolean })

      // THEN
      expect(page.properties.boolean as unknown as boolean).toBe(false)
    })

    it('should insert a page in a table with a text property', async () => {
      // GIVEN
      const text =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

      // WHEN
      const page = await table1.insert({ text })

      // THEN
      expect(page.properties.text).toBe(text)
    })

    it('should insert a page in a table with an empty text property', async () => {
      // WHEN
      const page = await table1.insert({ text: null })

      // THEN
      expect(page.properties.text).toBeNull()
    })

    it('should insert a page in a table with an URL property', async () => {
      // GIVEN
      const url = 'https://example.com'

      // WHEN
      const page = await table1.insert({ url })

      // THEN
      expect(page.properties.url).toBe(url)
    })

    it('should insert a page in a table with an empty URL property', async () => {
      // WHEN
      const page = await table1.insert({ url: null })

      // THEN
      expect(page.properties.url).toBeNull()
    })

    it('should insert a page in a table with an email property', async () => {
      // GIVEN
      const email = 'test@test.com'

      // WHEN
      const page = await table1.insert({ email })

      // THEN
      expect(page.properties.email).toBe(email)
    })

    it('should insert a page in a table with an empty email property', async () => {
      // WHEN
      const page = await table1.insert({ email: null })

      // THEN
      expect(page.properties.email).toBeNull()
    })

    it('should insert a page in a table with an phone property', async () => {
      // GIVEN
      const phone = '+33612345678'

      // WHEN
      const page = await table1.insert({ phone })

      // THEN
      expect(page.properties.phone).toBe(phone)
    })

    it('should insert a page in a table with an empty phone property', async () => {
      // WHEN
      const page = await table1.insert({ phone: null })

      // THEN
      expect(page.properties.phone).toBeNull()
    })

    it('should insert a page in a table with a single_select property', async () => {
      // GIVEN
      const single_select = '1'

      // WHEN
      const page = await table1.insert({ single_select })

      // THEN
      expect(page.properties.single_select).toBe(single_select)
    })

    it('should insert a page in a table with a status property', async () => {
      // GIVEN
      const status = 'En cours'

      // WHEN
      const page = await table1.insert({ status })

      // THEN
      expect(page.properties.status).toBe(status)
    })

    it('should insert a page in a table with a multi_select property', async () => {
      // GIVEN
      const multi_select = ['1', '2']

      // WHEN
      const page = await table1.insert({ multi_select })

      // THEN
      expect(page.properties.multi_select).toStrictEqual(multi_select)
    })

    it('should insert a page in a table with a date property', async () => {
      // GIVEN
      const date = new Date(2018, 8, 22, 15, 0, 0)

      // WHEN
      const page = await table1.insert({ date })

      // THEN
      expect(page.properties.date?.toString()).toBe(date.toString())
    })

    it('should insert a page in a table with a date property from a date string', async () => {
      // GIVEN
      const date = '2018-09-22'

      // WHEN
      const page = await table1.insert({ date })

      // THEN
      expect(page.properties.date as unknown as Date).toStrictEqual(
        parse(date, 'yyyy-MM-dd', new Date())
      )
    })

    it('should insert a page in a table with a date property from a date and time string', async () => {
      // GIVEN
      const date = '2018-09-22T15:00:00'

      // WHEN
      const page = await table1.insert({ date })

      // THEN
      expect(page.properties.date as unknown as Date).toStrictEqual(
        parse(date, "yyyy-MM-dd'T'HH:mm:ss", new Date())
      )
    })

    it('should insert a page in a table with a date property from a date, time and milliseconds string', async () => {
      // GIVEN
      const date = '2018-09-22T15:00:00.000Z'

      // WHEN
      const page = await table1.insert({ date })

      // THEN
      expect(page.properties.date as unknown as Date).toStrictEqual(
        parse(date, "yyyy-MM-dd'T'HH:mm:ss.SSSX", new Date())
      )
    })

    it('should insert a page in a table with a date property from a timestamp', async () => {
      // GIVEN
      const date = new Date(2018, 8, 22)
      const timestamp = +date

      // WHEN
      const page = await table1.insert({ date: timestamp })

      // THEN
      expect(page.properties.date?.toString()).toBe(date.toString())
    })

    it('should insert a page in a table with a date property and a null value', async () => {
      // GIVEN
      const date = null

      // WHEN
      const page = await table1.insert({ date })

      // THEN
      expect(page.properties.date).toBeNull()
    })

    it('should insert a page in a table with a people property', async () => {
      // GIVEN
      const [{ id }] = await integration.listAllUsers()

      // WHEN
      const page = await table1.insert({ people: [id] })

      // THEN
      expect(page.properties.people).toStrictEqual([id])
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
      const page = await table1.insert({ files })

      // THEN
      expect(page.properties.files).toStrictEqual(files)
    })
  })

  describe('retrieve', () => {
    it('should retrieve a page in a table', async () => {
      // GIVEN
      const name = nanoid()
      const { id } = await table1.insert({ name })

      // WHEN
      const page = await table1.retrieve(id)

      // THEN
      expect(page.properties.name).toBe(name)
    })

    it('should retrieve a page in a table with a created_time', async () => {
      // GIVEN
      const name = nanoid()
      const { id } = await table1.insert({ name })

      // WHEN
      const page = await table1.retrieve(id)

      // THEN
      expect(page.created_time).toBeDefined()
    })

    it('should retrieve a page in a table with a last_edited_time', async () => {
      // GIVEN
      const name = nanoid()
      const { id } = await table1.insert({ name })

      // WHEN
      const page = await table1.retrieve(id)

      // THEN
      expect(page.last_edited_time).toBeDefined()
    })

    it('should retrieve an archived page in a table', async () => {
      // GIVEN
      const name = nanoid()
      const { id } = await table1.insert({ name })
      await table1.archive(id)

      // WHEN
      const page = await table1.retrieve(id)

      // THEN
      expect(page.archived).toBeTruthy()
    })
  })

  describe('update', () => {
    it('should update a page in a table with a title property', async () => {
      // GIVEN
      const { id } = await table1.insert({ name: 'John' })
      const name = 'John Doe'

      // WHEN
      const page = await table1.update(id, { name })

      // THEN
      expect(page.properties.name).toBe(name)
    })

    it('should update a page in a table with a number property', async () => {
      // GIVEN
      const { id } = await table1.insert({ number: 456 })
      const number = 123

      // WHEN
      const page = await table1.update(id, { number })

      // THEN
      expect(page.properties.number).toBe(number)
    })

    it('should update a page in a table with a boolean property', async () => {
      // GIVEN
      const { id } = await table1.insert({ boolean: false })
      const boolean = true

      // WHEN
      const page = await table1.update(id, { boolean })

      // THEN
      expect(page.properties.boolean).toBe(boolean)
    })

    it('should update a page in a table with a text property', async () => {
      // GIVEN
      const { id } = await table1.insert({
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      })
      const text =
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

      // WHEN
      const page = await table1.update(id, { text })

      // THEN
      expect(page.properties.text).toBe(text)
    })

    it('should update a page in a table with a single_select property', async () => {
      // GIVEN
      const { id } = await table1.insert({ single_select: '1' })
      const single_select = '2'

      // WHEN
      const page = await table1.update(id, { single_select })

      // THEN
      expect(page.properties.single_select).toBe(single_select)
    })

    it('should update a page in a table with a status property', async () => {
      // GIVEN
      const { id } = await table1.insert({ status: 'En cours' })
      const status = 'Terminé'

      // WHEN
      const page = await table1.update(id, { status })

      // THEN
      expect(page.properties.status).toBe(status)
    })

    it('should update a page in a table with a multi_select property', async () => {
      // GIVEN
      const { id } = await table1.insert({ multi_select: ['1', '2'] })
      const multi_select = ['3', '4']

      // WHEN
      const page = await table1.update(id, { multi_select })

      // THEN
      expect(page.properties.multi_select).toStrictEqual(multi_select)
    })

    it('should update a page in a table with a date property', async () => {
      // GIVEN
      const { id } = await table1.insert({ date: new Date(2000) })
      const date = new Date(2018, 8, 22, 15, 0, 0)

      // WHEN
      const page = await table1.update(id, { date })

      // THEN
      expect(page.properties.date?.toString()).toBe(date.toString())
    })

    it('should update a page in a table with a date property and a null value', async () => {
      // GIVEN
      const { id } = await table1.insert({ date: new Date(2000) })
      const date = null

      // WHEN
      const page = await table1.update(id, { date })

      // THEN
      expect(page.properties.date).toBeNull()
    })

    it('should update a page in a table with a people property', async () => {
      // GIVEN
      const [{ id: peopleId }] = await integration.listAllUsers()
      const { id } = await table1.insert({ people: [] })

      // WHEN
      const page = await table1.update(id, { people: [peopleId] })

      // THEN
      expect(page.properties.people).toStrictEqual([peopleId])
    })

    it('should update a page in a table with a files property', async () => {
      // GIVEN
      const files = [
        {
          name: 'John Doe',
          url: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb',
        },
      ]
      const { id } = await table1.insert({ files: [] })

      // WHEN
      const page = await table1.update(id, { files })

      // THEN
      expect(page.properties.files).toStrictEqual(files)
    })
  })

  describe('insertMany', () => {
    it('should insert many pages in a table with a title property', async () => {
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
    it('should update many pages in a table with a title property', async () => {
      // GIVEN
      const pagesinsertd = await table1.insertMany([
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
      const pagesUpdated = await table1.updateMany(
        pagesinsertd.map((page) => ({ id: page.id, page: { name: 'John Doe' } }))
      )

      // THEN
      expect(pagesUpdated.map((p) => p.properties.name)).toStrictEqual([
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
      const { id } = await table1.insert({ name })

      // WHEN
      await table1.archive(id)

      // THEN
      const page = await table1.retrieve(id)
      if (!('archived' in page)) {
        throw new Error('Page properties are missing')
      }
      expect(page.archived).toBe(true)
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
      await table1.insertMany(values)

      // WHEN
      const pages = await table1.list({
        or: values.map((value) => ({
          field: 'name',
          operator: 'Is',
          value: value.name,
        })),
      })

      // THEN
      expect(pages).toHaveLength(3)
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
      await table1.insertMany(values)

      // WHEN
      const pages = await table1.list({
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

      // THEN
      expect(pages).toHaveLength(3)
    })

    it('should throw an error if filter field does not exist', async () => {
      // GIVEN
      const name = nanoid()
      const page = await table1.insert({ name })

      // WHEN
      const call = async () =>
        table1.list({
          field: 'invalid',
          operator: 'Is',
          value: page.id,
        })

      // THEN
      await expect(call()).rejects.toThrow('Field "invalid" does not exist')
    })

    it('should list pages in a table with a Is filter on a formula', async () => {
      // GIVEN
      const name = nanoid()
      const page = await table1.insert({ name })

      // WHEN
      const pages = await table1.list({
        field: 'id',
        operator: 'Is',
        value: page.id,
      })

      // THEN
      expect(pages).toHaveLength(1)
    })

    it('should list pages in a table with a Contains filter on a rollup', async () => {
      // GIVEN
      const table2 = await integration.getTable(TABLE_2_ID)
      const name = nanoid()
      const pageTable2 = await table2.insert({ name })
      await table1.insert({ name: nanoid(), relation: [pageTable2.id] })

      // WHEN
      const pages = await table1.list({
        field: 'rollup_names',
        operator: 'Contains',
        value: name,
      })

      // THEN
      expect(pages).toHaveLength(1)
    })
  })

  describe('stress test', () => {
    it('should allow 100 requests in few seconds', async () => {
      // GIVEN
      const values = Array.from({ length: 100 }, () => ({
        name: nanoid(),
      }))

      // WHEN
      const pages = await table1.insertMany(values)

      // THEN
      expect(pages).toHaveLength(100)
    })
  })
}
