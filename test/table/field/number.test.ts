import Tester, { expect, describe, it } from 'bun:test'
import { Mock } from '/test/bun'
import { number } from '../../../examples/config/table/field/number'

const mock = new Mock(Tester)

mock.request(({ app, request }) => {
  describe('on app start', () => {
    it('should create a table with a number ', async () => {
      // GIVEN
      const call = () => app.start(number)

      // THEN
      expect(call()).resolves.toBeDefined()
    })
  })

  describe('on API POST', () => {
    it('should create a record with a number', async () => {
      // GIVEN
      const numberValue = 10
      const { url } = await app.start(number)

      // WHEN
      const { record } = await request.post(`${url}/api/table/${number.tables![0].name}`, {
        number: numberValue,
      })

      // THEN
      expect(record.fields.number).toBe(numberValue)
    })
  })
})
