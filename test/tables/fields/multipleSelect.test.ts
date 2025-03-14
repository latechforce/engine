import Tester, { expect, describe, it } from 'bun:test'
import { Mock } from '/test/bun'
import { getFirstTableConfig } from '/test/config'

const mock = new Mock(Tester)

mock.request(({ app, request }) => {
  describe('on start', () => {
    it('should create a table with a multiple select', async () => {
      // GIVEN
      const config = getFirstTableConfig(['multiple_select'])

      // WHEN
      const startedApp = await app.start(config)

      // THEN
      expect(startedApp).toBeDefined()
    })
  })

  describe('on POST', () => {
    it('should create a record with a multiple select', async () => {
      // GIVEN
      const multiple_select = ['Red', 'Blue']
      const config = getFirstTableConfig(['multiple_select'])
      const { url } = await app.start(config)

      // WHEN
      const { record } = await request.post(`${url}/api/table/${config.tables[0].name}`, {
        multiple_select,
      })

      // THEN
      expect(record.fields.multiple_select).toStrictEqual(multiple_select)
    })

    it('should not create a record with a wrong value in a multiple select', async () => {
      // GIVEN
      const multiple_select = ['Yellow']
      const config = getFirstTableConfig(['multiple_select'])
      const { url } = await app.start(config)

      // WHEN
      const { error } = await request.post(`${url}/api/table/${config.tables[0].name}`, {
        multiple_select,
      })

      // THEN
      expect(error).toStrictEqual({
        instancePath: '/multiple_select/0',
        keyword: 'enum',
        message: 'must be equal to one of the allowed values',
        params: { allowedValues: ['Red', 'Blue', 'Green'] },
        schemaPath: '#/properties/multiple_select/items/enum',
      })
    })
  })
})
