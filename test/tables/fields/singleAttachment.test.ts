import Tester, { expect, describe, it } from 'bun:test'
import { Mock } from '/test/bun'
import { getFirstTableConfig } from '/test/config'

const mock = new Mock(Tester)

mock.request(({ app, request }) => {
  describe('on start', () => {
    it('should create a table with a single select', async () => {
      // GIVEN
      const config = getFirstTableConfig(['single_attachment'])

      // WHEN
      const startedApp = await app.start(config)

      // THEN
      expect(startedApp).toBeDefined()
    })
  })

  describe('on POST', () => {
    it('should create a record with a single attachment', async () => {
      // GIVEN
      const single_attachment = {
        name: 'file1.txt',
        url: 'https://example.com/file1.txt',
      }
      const config = getFirstTableConfig(['single_attachment'])
      const { url } = await app.start(config)

      // WHEN
      const { record } = await request.post(`${url}/api/table/${config.tables[0].name}`, {
        single_attachment,
      })

      // THEN
      expect(record.fields.single_attachment?.name).toBe('file1.txt')
      expect(record.fields.single_attachment?.mime_type).toBe('text/plain')
      expect(record.fields.single_attachment?.url).toStartWith('https://example.com/file1')
    })
  })
})
