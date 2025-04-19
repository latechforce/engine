import Tester, { expect, describe, it } from 'bun:test'
import { Mock } from '/test/bun'
import { configAutomationActionIntegrationGoCardlessCreatePayment } from '/examples/config/automation/action/integration/gocardless/createPayment'

const mock = new Mock(Tester, { integrations: ['GoCardless'] })

mock.request(({ app, request }) => {
  describe('on POST', () => {
    it('should create a payment', async () => {
      // GIVEN
      const { url } = await app.start(configAutomationActionIntegrationGoCardlessCreatePayment)

      // WHEN
      const response = await request.post(`${url}/api/automation/create-payment`)

      // THEN
      expect(response.id).toBeDefined()
    })
  })
})
