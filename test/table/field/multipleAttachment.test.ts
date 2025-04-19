import Tester, { expect, describe, it } from 'bun:test'
import { Mock } from '/test/bun'
import { multipleAttachment } from '../../../examples/config/table/field/multipleAttachment'

const mock = new Mock(Tester)

mock.request(({ app, request }) => {
  describe('on start', () => {
    it('should create a table with a multiple select', async () => {
      // WHEN
      const startedApp = await app.start(multipleAttachment)

      // THEN
      expect(startedApp).toBeDefined()
    })
  })

  describe('on POST', () => {
    it('should create a record with a multiple attachment', async () => {
      // GIVEN
      const multiple_attachment = [
        {
          name: 'file1.txt',
          url: 'https://example.com/file1.txt',
        },
      ]
      const { url } = await app.start(multipleAttachment)

      // WHEN
      const { record } = await request.post(
        `${url}/api/table/${multipleAttachment.tables![0].name}`,
        {
          multiple_attachment,
        }
      )

      // THEN
      expect(record.fields.multiple_attachment[0].name).toBe('file1.txt')
      expect(record.fields.multiple_attachment[0].mime_type).toBe('text/plain')
      expect(record.fields.multiple_attachment[0].url).toStartWith('https://example.com/file1')
    })
  })
})
