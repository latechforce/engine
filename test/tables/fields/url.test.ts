import Tester, { expect, describe, it } from 'bun:test'
import { Mock } from '/test/bun'
import { getFirstTableSchema } from '/test/common'

const mock = new Mock(Tester)

mock.request(({ app, request }) => {
  describe('on start', () => {
    it('should create a table with an url', async () => {
      // GIVEN
      const config = getFirstTableSchema(['url'])

      // WHEN
      const startedApp = await app.start(config)

      // THEN
      expect(startedApp).toBeDefined()
    })
  })

  describe('on POST', () => {
    it('should create a record with an url', async () => {
      // GIVEN
      const urlField = 'https://test.com'
      const config = getFirstTableSchema(['url'])
      const { url } = await app.start(config)

      // WHEN
      const { record } = await request.post(`${url}/api/table/${config.tables[0].name}`, {
        url: urlField,
      })

      // THEN
      expect(record.fields.url).toBe(urlField)
    })
  })
})
