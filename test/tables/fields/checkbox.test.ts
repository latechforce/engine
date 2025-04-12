import Tester, { expect, describe, it } from 'bun:test'
import { Mock } from '/test/bun'
import { getFirstTableSchema } from '/test/common'

const mock = new Mock(Tester)

mock.request(({ app, request }) => {
  describe('on start', () => {
    it('should create a table with a checkbox', async () => {
      // GIVEN
      const config = getFirstTableSchema(['checkbox'])

      // WHEN
      const startedApp = await app.start(config)

      // THEN
      expect(startedApp).toBeDefined()
    })
  })

  describe('on POST', () => {
    it('should create a record with a checkbox', async () => {
      // GIVEN
      const checkbox = true
      const config = getFirstTableSchema(['checkbox'])
      const { url } = await app.start(config)

      // WHEN
      const { record } = await request.post(`${url}/api/table/${config.tables[0].name}`, {
        checkbox,
      })

      // THEN
      expect(record.fields.checkbox).toBe(checkbox)
    })
  })
})
