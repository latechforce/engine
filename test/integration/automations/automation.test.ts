import Tester, { expect, describe, it } from 'bun:test'
import { IntegrationTest } from '@test/integration'
import { getAutomationConfig } from '@test/config'

new IntegrationTest(Tester).with({ drivers: ['Database'] }, ({ app, request, drivers }) => {
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
