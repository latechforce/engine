import Tester, { expect, describe, it } from 'bun:test'
import { Mock } from '/test/bun'
import { singleLineText } from '../../../examples/config/table/field/type/singleLineText'

const mock = new Mock(Tester)

mock.request(({ app, request }) => {
  describe('on app start', () => {
    it('should create a table with a single line text field', async () => {
      // WHEN
      const call = () => app.start(singleLineText)

      // THEN
      expect(call()).resolves.toBeDefined()
    })
  })

  describe('on API POST', () => {
    it('should create a record with a single line text field', async () => {
      // GIVEN
      const name = 'John Doe'
      const { url } = await app.start(singleLineText)

      // WHEN
      const { record } = await request.post(`${url}/api/table/${singleLineText.tables![0].name}`, {
        single_line_text: name,
      })

      // THEN
      expect(record.fields.single_line_text).toBe(name)
    })
  })
})
