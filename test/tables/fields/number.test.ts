import Tester, { expect, describe, it } from 'bun:test'
import { Mock } from '/test/bun'
import { getFirstTableSchema } from '/test/common'

const mock = new Mock(Tester)

mock.request(({ app, request }) => {
  describe('on start', () => {
    it('should create a table with a number ', async () => {
      // GIVEN
      const config = getFirstTableSchema(['number'])

      // WHEN
      const startedApp = await app.start(config)

      // THEN
      expect(startedApp).toBeDefined()
    })
  })

  describe('on POST', () => {
    it('should create a record with a number', async () => {
      // GIVEN
      const number = 10
      const config = getFirstTableSchema(['number'])
      const { url } = await app.start(config)

      // WHEN
      const { record } = await request.post(`${url}/api/table/${config.tables[0].name}`, {
        number,
      })

      // THEN
      expect(record.fields.number).toBe(number)
    })
  })
})
