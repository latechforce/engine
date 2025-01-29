import Tester, { expect, describe, it } from 'bun:test'
import { Helpers } from '/test/bun'
import { getAutomationConfig } from '/test/config'

const helpers = new Helpers(Tester)

helpers.testWithMockedApp({ drivers: ['Database'] }, ({ app, request, drivers }) => {
  describe('on POST', () => {
    it('should create an automation history', async () => {
      // GIVEN
      const config = getAutomationConfig('ApiCalled')
      const { url } = await app.start(config)

      // WHEN
      await request.post(`${url}/api/automation/run`)

      // THEN
      const { rows: histories } = await drivers.database.query(
        'SELECT * FROM _automations_histories_view'
      )
      expect(histories).toHaveLength(1)
    })
  })
})
