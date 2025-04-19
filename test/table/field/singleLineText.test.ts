import Tester, { expect, describe, it } from 'bun:test'
import { Mock } from '/test/bun'
import { configTableFieldSingleLineText } from '/examples/config/table/field/singleLineText'

const mock = new Mock(Tester)

mock.request(({ app, request }) => {
  describe('on start', () => {
    it('should create a table with a single line text field', async () => {
      // WHEN
      const call = () => app.start(configTableFieldSingleLineText)

      // THEN
      expect(call()).resolves.toBeDefined()
    })
  })

  describe('on POST', () => {
    it('should create a record with a single line text field', async () => {
      // GIVEN
      const name = 'John Doe'
      const { url } = await app.start(configTableFieldSingleLineText)

      // WHEN
      const { record } = await request.post(
        `${url}/api/table/${configTableFieldSingleLineText.tables![0].name}`,
        {
          single_line_text: name,
        }
      )

      // THEN
      expect(record.fields.single_line_text).toBe(name)
    })
  })
})
