import Tester, { expect, describe, it } from 'bun:test'
import { IntegrationTest } from '@test/integration'
import { getFirstTableConfig } from '@test/config'

new IntegrationTest(Tester).with({}, ({ app, request }) => {
  describe('on start', () => {
    it('should create a table with a single line text', async () => {
      // GIVEN
      const config = getFirstTableConfig(['name'])

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
      const config = getFirstTableConfig(['name'])
      const { url } = await app.start(config)

      // WHEN
      const response = await request.post(`${url}/api/table/${config.tables[0].name}`, {
        name,
      })

      // THEN
      const { record } = response
      expect(record.fields.name).toBe(name)
    })
  })
})
