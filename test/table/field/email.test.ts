import Tester, { expect, describe, it } from 'bun:test'
import { Mock } from '/test/bun'
import { email } from '../../../examples/config/table/field/email'

const mock = new Mock(Tester)

mock.request(({ app, request }) => {
  describe('on start', () => {
    it('should create a table with an email field', async () => {
      // WHEN
      const call = () => app.start(email)

      // THEN
      expect(call()).resolves.toBeDefined()
    })
  })

  describe('on POST', () => {
    it('should create a record with an email field', async () => {
      // GIVEN
      const emailValue = 'test@test.com'
      const { url } = await app.start(email)

      // WHEN
      const { record } = await request.post(`${url}/api/table/${email.tables![0].name}`, {
        email: emailValue,
      })

      // THEN
      expect(record.fields.email).toBe(emailValue)
    })
  })
})
