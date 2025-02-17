import Tester, { expect, describe, it } from 'bun:test'
import { Helpers } from '/test/bun'
import { getFirstTableConfig } from '/test/config'

const helpers = new Helpers(Tester)

helpers.testWithMockedApp({}, ({ app, request }) => {
  describe('on start', () => {
    it('should create a table with an email', async () => {
      // GIVEN
      const config = getFirstTableConfig(['email'])

      // WHEN
      const startedApp = await app.start(config)

      // THEN
      expect(startedApp).toBeDefined()
    })
  })

  describe('on POST', () => {
    it('should create a record with an email', async () => {
      // GIVEN
      const email = 'test@test.com'
      const config = getFirstTableConfig(['email'])
      const { url } = await app.start(config)

      // WHEN
      const { record } = await request.post(`${url}/api/table/${config.tables[0].name}`, {
        email,
      })

      // THEN
      expect(record.fields.email).toBe(email)
    })
  })
})
