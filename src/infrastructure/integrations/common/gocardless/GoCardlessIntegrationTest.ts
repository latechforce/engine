import type { IGoCardlessIntegration } from '/adapter/spi/integrations/GoCardlessSpi'
import type BunTester from 'bun:test'
import { qontoCreatePaymentSample } from '../../bun/mocks/gocardless/GoCardlessTestSamples'

export function testGoCardlessIntegration(
  { describe, it, expect }: typeof BunTester,
  integration: IGoCardlessIntegration
) {
  describe('createPayment', () => {
    it('should create a payment', async () => {
      // WHEN
      const payment = await integration.createPayment(qontoCreatePaymentSample)

      // THEN
      expect(payment?.id).toBeDefined()
    })
  })
}
