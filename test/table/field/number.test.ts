import Tester, { expect, describe, it } from 'bun:test'
import { Mock } from '/test/bun'
import { configTableFieldNumber } from '/examples/config/table/field/number'

const mock = new Mock(Tester)

mock.request(({ app, request }) => {
  describe('on start', () => {
    it('should create a table with a number ', async () => {
      // GIVEN
      const call = () => app.start(configTableFieldNumber)

      // THEN
      expect(call()).resolves.toBeDefined()
    })
  })

  describe('on POST', () => {
    it('should create a record with a number', async () => {
      // GIVEN
      const numberValue = 10
      const { url } = await app.start(configTableFieldNumber)

      // WHEN
      const { record } = await request.post(
        `${url}/api/table/${configTableFieldNumber.tables![0].name}`,
        {
          number: numberValue,
        }
      )

      // THEN
      expect(record.fields.number).toBe(numberValue)
    })
  })
})
