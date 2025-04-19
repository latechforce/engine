import Tester, { expect, describe, it } from 'bun:test'
import { Mock } from '/test/bun'
import { dateTime } from '../../../examples/config/table/field/dateTime'

const mock = new Mock(Tester)

mock.request(({ app, request }) => {
  describe('on start', () => {
    it('should create a table with an date time', async () => {
      // WHEN
      const call = () => app.start(dateTime)

      // THEN
      expect(call()).resolves.toBeDefined()
    })
  })

  describe('on POST', () => {
    it('should create a record with an date time', async () => {
      // GIVEN
      const date = new Date().toISOString()
      const { url } = await app.start(dateTime)

      // WHEN
      const { record } = await request.post(`${url}/api/table/${dateTime.tables![0].name}`, {
        date_time: date,
      })

      // THEN
      expect(record.fields.date_time).toBe(date)
    })
  })
})
