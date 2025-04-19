import Tester, { expect, describe, it } from 'bun:test'
import { Mock } from '/test/bun'
import { singleAttachment } from '../../../examples/config/table/field/singleAttachment'

const mock = new Mock(Tester)

mock.request(({ app, request }) => {
  describe('on start', () => {
    it('should create a table with a single select', async () => {
      // WHEN
      const call = () => app.start(singleAttachment)

      // THEN
      expect(call()).resolves.toBeDefined()
    })
  })

  describe('on POST', () => {
    it('should create a record with a single attachment', async () => {
      // GIVEN
      const single_attachment = {
        name: 'file1.txt',
        url: 'https://example.com/file1.txt',
      }
      const { url } = await app.start(singleAttachment)

      // WHEN
      const { record } = await request.post(
        `${url}/api/table/${singleAttachment.tables![0].name}`,
        {
          single_attachment,
        }
      )

      // THEN
      expect(record.fields.single_attachment?.name).toBe('file1.txt')
      expect(record.fields.single_attachment?.mime_type).toBe('text/plain')
      expect(record.fields.single_attachment?.url).toStartWith('https://example.com/file1')
    })
  })
})
