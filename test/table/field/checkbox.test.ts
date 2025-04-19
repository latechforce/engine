import Tester, { expect, describe, it } from 'bun:test'
import { Mock } from '/test/bun'
import { checkbox } from '../../../examples/config/table/field/checkbox'

const mock = new Mock(Tester)

mock.request(({ app, request }) => {
  describe('on start', () => {
    it('should create a table with a checkbox', async () => {
      // GIVEN
      const call = () => app.start(checkbox)

      // THEN
      expect(call()).resolves.toBeDefined()
    })
  })

  describe('on POST', () => {
    it('should create a record with a checkbox', async () => {
      // GIVEN
      const checkboxValue = true
      const { url } = await app.start(checkbox)

      // WHEN
      const { record } = await request.post(`${url}/api/table/${checkbox.tables![0].name}`, {
        checkbox: checkboxValue,
      })

      // THEN
      expect(record.fields.checkbox).toBe(checkboxValue)
    })
  })
})
