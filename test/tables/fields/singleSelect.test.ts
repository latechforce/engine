import Tester, { expect, describe, it } from 'bun:test'
import { Mock } from '/test/bun'
import { getFirstTableSchema } from '/test/common'

const mock = new Mock(Tester)

mock.request(({ app, request }) => {
  describe('on start', () => {
    it('should create a table with a single select', async () => {
      // GIVEN
      const config = getFirstTableSchema(['single_select'])

      // WHEN
      const startedApp = await app.start(config)

      // THEN
      expect(startedApp).toBeDefined()
    })
  })

  describe('on POST', () => {
    it('should create a record with a single select', async () => {
      // GIVEN
      const single_select = 'Red'
      const config = getFirstTableSchema(['single_select'])
      const { url } = await app.start(config)

      // WHEN
      const { record } = await request.post(`${url}/api/table/${config.tables[0].name}`, {
        single_select,
      })

      // THEN
      expect(record.fields.single_select).toBe(single_select)
    })
  })

  it('should not create a record with a wrong value in a single select', async () => {
    // GIVEN
    const single_select = 'Yellow'
    const config = getFirstTableSchema(['single_select'])
    const { url } = await app.start(config)

    // WHEN
    const { error } = await request.post(`${url}/api/table/${config.tables[0].name}`, {
      single_select,
    })

    // THEN
    expect(error).toStrictEqual({
      instancePath: '/single_select',
      keyword: 'enum',
      message: 'must be equal to one of the allowed values',
      params: { allowedValues: ['Red', 'Blue', 'Green', ''] },
      schemaPath: '#/properties/single_select/enum',
    })
  })
})
