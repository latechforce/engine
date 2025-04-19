import Tester, { expect, describe, it } from 'bun:test'
import { Mock } from '/test/bun'
import { multipleSelect } from '../../../examples/config/table/field/multipleSelect'

const mock = new Mock(Tester)

mock.request(({ app, request }) => {
  describe('on start', () => {
    it('should create a table with a multiple select', async () => {
      // WHEN
      const call = () => app.start(multipleSelect)

      // THEN
      expect(call()).resolves.toBeDefined()
    })
  })

  describe('on POST', () => {
    it('should create a record with a multiple select', async () => {
      // GIVEN
      const multipleSelectValue = ['Option 1', 'Option 2']
      const { url } = await app.start(multipleSelect)

      // WHEN
      const { record } = await request.post(`${url}/api/table/${multipleSelect.tables![0].name}`, {
        multiple_select: multipleSelectValue,
      })

      // THEN
      expect(record.fields.multiple_select).toStrictEqual(multipleSelectValue)
    })

    it('should not create a record with a wrong value in a multiple select', async () => {
      // GIVEN
      const multipleSelectValue = ['Option 4']
      const { url } = await app.start(multipleSelect)

      // WHEN
      const { error } = await request.post(`${url}/api/table/${multipleSelect.tables![0].name}`, {
        multiple_select: multipleSelectValue,
      })

      // THEN
      expect(error).toStrictEqual({
        instancePath: '/multiple_select/0',
        keyword: 'enum',
        message: 'must be equal to one of the allowed values',
        params: { allowedValues: ['Option 1', 'Option 2', 'Option 3', ''] },
        schemaPath: '#/properties/multiple_select/items/enum',
      })
    })
  })
})
