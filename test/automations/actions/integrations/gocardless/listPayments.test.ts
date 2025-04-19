import Tester, { expect, describe, it } from 'bun:test'
import { Mock } from '/test/bun'
import { configAutomationActionIntegrationGoCardlessListPayments } from '/examples/config/automation/action/integration/gocardless/listPayments'

const mock = new Mock(Tester, { integrations: ['GoCardless'] })

mock.request(({ app, request }) => {
  describe('on POST', () => {
    it('should list payments', async () => {
      // GIVEN
      const { url } = await app.start(configAutomationActionIntegrationGoCardlessListPayments)

      // WHEN
      const response = await request.post(`${url}/api/automation/list-payments`)

      // THEN
      expect(response.payments).toBeDefined()
      expect(Array.isArray(response.payments)).toBe(true)
      expect(response.meta.limit).toBe(10)
    })
  })
})
