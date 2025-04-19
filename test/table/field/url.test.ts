import Tester, { expect, describe, it } from 'bun:test'
import { Mock } from '/test/bun'
import { url } from '../../../examples/config/table/field/url'

const mock = new Mock(Tester)

mock.request(({ app, request }) => {
  describe('on start', () => {
    it('should create a table with an url', async () => {
      // WHEN
      const call = () => app.start(url)

      // THEN
      expect(call()).resolves.toBeDefined()
    })
  })

  describe('on POST', () => {
    it('should create a record with an url', async () => {
      // GIVEN
      const urlField = 'https://test.com'
      const { url: urlPath } = await app.start(url)

      // WHEN
      const { record } = await request.post(`${urlPath}/api/table/${url.tables![0].name}`, {
        url: urlField,
      })

      // THEN
      expect(record.fields.url).toBe(urlField)
    })
  })
})
