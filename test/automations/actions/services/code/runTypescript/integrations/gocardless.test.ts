import Tester, { expect, describe, it } from 'bun:test'
import { Mock } from '/test/bun'
import { goCardlessCreatePaymentSample } from '/infrastructure/integrations/bun/mocks/gocardless/GoCardlessTestSamples'
import { configAutomationActionServiceCodeRunTypescriptWithGoCardlessCreatePaymentIntegration } from '/examples/config/automation/action/service/code/runTypescript/withIntegration/gocardless/createPayment'
import { configAutomationActionServiceCodeRunTypescriptWithGoCardlessListPaymentsIntegration } from '/examples/config/automation/action/service/code/runTypescript/withIntegration/gocardless/listPayments'

const mock = new Mock(Tester, { integrations: ['GoCardless'] })

mock.request(({ app, request, integrations }) => {
  describe('on POST', () => {
    it('should run a Typescript code with GoCardless create payment', async () => {
      // GIVEN
      const { url } = await app.start(
        configAutomationActionServiceCodeRunTypescriptWithGoCardlessCreatePaymentIntegration
      )

      // WHEN
      const response = await request.post(`${url}/api/automation/create-payment`)

      // THEN
      expect(response.payment.id).toBeDefined()
    })

    it('should run a Typescript code with GoCardless list payments', async () => {
      // GIVEN
      const payment = await integrations.gocardless.createPayment(goCardlessCreatePaymentSample)
      const { url } = await app.start(
        configAutomationActionServiceCodeRunTypescriptWithGoCardlessListPaymentsIntegration
      )

      // WHEN
      const response = await request.post(`${url}/api/automation/list-payments`)

      // THEN
      expect(response.payments).toBeDefined()
      expect(Array.isArray(response.payments)).toBe(true)
      expect(response.meta.limit).toBe(10)
      expect(response.payments[0].id).toBe(payment.data?.id)
    })
  })
})
