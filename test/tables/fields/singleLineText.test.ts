import Tester, { expect, describe, it } from 'bun:test'
import { Mock } from '/test/bun'
import { getFirstTableSchema } from '/test/common'

const mock = new Mock(Tester)

mock.request(({ app, request }) => {
  describe('on start', () => {
    it('should create a table with a single line text', async () => {
      // GIVEN
      const config = getFirstTableSchema(['name'])

      // WHEN
      const startedApp = await app.start(config)

      // THEN
      expect(startedApp).toBeDefined()
    })
  })

  describe('on POST', () => {
    it('should create a record with a single line text', async () => {
      // GIVEN
      const name = 'John Doe'
      const config = getFirstTableSchema(['name'])
      const { url } = await app.start(config)

      // WHEN
      const { record } = await request.post(`${url}/api/table/${config.tables[0].name}`, {
        name,
      })

      // THEN
      expect(record.fields.name).toBe(name)
    })
  })
})
