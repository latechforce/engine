import Tester, { expect, describe, it } from 'bun:test'
import { Mock } from '/test/bun'
import { longText } from '../../../examples/config/table/field/longText'

const mock = new Mock(Tester)

mock.request(({ app, request }) => {
  describe('on start', () => {
    it('should create a table with a long text', async () => {
      // WHEN
      const startedApp = await app.start(longText)

      // THEN
      expect(startedApp).toBeDefined()
    })
  })

  describe('on POST', () => {
    it('should create a record with a long text', async () => {
      // GIVEN
      const long_text =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      const { url } = await app.start(longText)

      // WHEN
      const { record } = await request.post(`${url}/api/table/${longText.tables![0].name}`, {
        long_text,
      })

      // THEN
      expect(record.fields.long_text).toBe(long_text)
    })
  })
})
