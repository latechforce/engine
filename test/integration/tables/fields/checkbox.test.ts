import Tester, { expect, describe, it } from 'bun:test'
import { IntegrationTest } from '@test/integration'
import { getFirstTableConfig } from '@test/config'

new IntegrationTest(Tester).with({}, ({ app, request }) => {
  describe('on start', () => {
    it('should create a table with a checkbox', async () => {
      // GIVEN
      const config = getFirstTableConfig(['checkbox'])

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
      const config = getFirstTableConfig(['checkbox'])
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
