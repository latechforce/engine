import Tester, { expect, describe, it } from 'bun:test'
import { Mock } from '/test/bun'
import { singleSelect } from '../../../examples/config/table/field/singleSelect'

const mock = new Mock(Tester)

mock.request(({ app, request }) => {
  describe('on start', () => {
    it('should create a table with a single select', async () => {
      // WHEN
      const call = () => app.start(singleSelect)

      // THEN
      expect(call()).resolves.toBeDefined()
    })
  })

  describe('on POST', () => {
    it('should create a record with a single select', async () => {
      // GIVEN
      const single_select = 'Option 1'
      const { url } = await app.start(singleSelect)

      // WHEN
      const { record } = await request.post(`${url}/api/table/${singleSelect.tables![0].name}`, {
        single_select,
      })

      // THEN
      expect(record.fields.single_select).toBe(single_select)
    })

    it('should not create a record with a wrong value in a single select', async () => {
      // GIVEN
      const single_select = 'Yellow'
      const { url } = await app.start(singleSelect)

      // WHEN
      const { error } = await request.post(`${url}/api/table/${singleSelect.tables![0].name}`, {
        single_select,
      })

      // THEN
      expect(error).toStrictEqual({
        instancePath: '/single_select',
        keyword: 'enum',
        message: 'must be equal to one of the allowed values',
        params: { allowedValues: ['Option 1', 'Option 2', 'Option 3', ''] },
        schemaPath: '#/properties/single_select/enum',
      })
    })
  })
})
