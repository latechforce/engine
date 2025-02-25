import type { IGoCardlessIntegration } from '/adapter/spi/integrations/GoCardlessSpi'
import type BunTester from 'bun:test'
import {
  goCardlessCreatePaymentSample,
  goCardlessListPaymentsSample,
} from '../../bun/mocks/gocardless/GoCardlessTestSamples'
import type { GoCardlessPayment } from '/domain/integrations/GoCardless'

export function testGoCardlessIntegration(
  { describe, it, expect }: typeof BunTester,
  integration: IGoCardlessIntegration
) {
  let payment: GoCardlessPayment

  describe('createPayment', () => {
    it('should create a payment', async () => {
      // WHEN
      payment = await integration.createPayment(goCardlessCreatePaymentSample)

      // THEN
      expect(payment?.id).toBeDefined()
    })
  })

  describe('listPayments', () => {
    it('should list payments', async () => {
      // WHEN
      const result = await integration.listPayments(goCardlessListPaymentsSample)

      // THEN
      expect(result.payments).toBeDefined()
      expect(Array.isArray(result.payments)).toBe(true)
      expect(result.meta.limit).toBeDefined()
      expect(result.payments[0].id).toBe(payment.id)
    })
  })
}
