import BunTester, { expect, describe, it } from 'bun:test'
import { Mock } from '/infrastructure/test/bun/Mock'
import { getAutomationSchema } from '/test/common'

const mock = new Mock(BunTester, { drivers: ['Database'] })

mock.request(({ app, request, drivers }) => {
  describe('on POST', () => {
    it('should create an automation history', async () => {
      // GIVEN
      const config = getAutomationSchema('ApiCalled')
      const { url } = await app.start(config)

      // WHEN
      await request.post(`${url}/api/automation/run`)

      // THEN
      const { rows: histories } = await drivers.database.query(
        'SELECT * FROM automations_histories_view'
      )
      expect(histories).toHaveLength(1)
    })
  })
})
