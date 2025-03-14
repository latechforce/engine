import Tester, { expect, describe, it } from 'bun:test'
import { Mock } from '/test/bun'
import { getFirstTableConfig } from '/test/config'

const mock = new Mock(Tester)

mock.request(({ app, request }) => {
  describe('on start', () => {
    it('should create a table with a multiple select', async () => {
      // GIVEN
      const config = getFirstTableConfig(['multiple_attachment'])

      // WHEN
      const startedApp = await app.start(config)

      // THEN
      expect(startedApp).toBeDefined()
    })
  })

  describe('on POST', () => {
    it('should create a record with a multiple attachment', async () => {
      // GIVEN
      const multiple_attachment = [
        {
          name: 'file1',
          url: 'https://example.com/file1',
        },
      ]
      const config = getFirstTableConfig(['multiple_attachment'])
      const { url } = await app.start(config)

      // WHEN
      const { record } = await request.post(`${url}/api/table/${config.tables[0].name}`, {
        multiple_attachment,
      })

      // THEN
      expect(record.fields.multiple_attachment).toStrictEqual(multiple_attachment)
    })
  })
})
