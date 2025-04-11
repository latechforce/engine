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
      const response = await integration.createPayment(goCardlessCreatePaymentSample)
      if (response.error) throw new Error('Error creating payment')
      payment = response.data

      // THEN
      expect(payment?.id).toBeDefined()
    })
  })

  describe('listPayments', () => {
    it('should list payments', async () => {
      // WHEN
      const result = await integration.listPayments(goCardlessListPaymentsSample)
      if (result.error) throw new Error('Error listing payments')

      // THEN
      expect(result.data.payments).toBeDefined()
      expect(Array.isArray(result.data.payments)).toBe(true)
      expect(result.data.meta.limit).toBeDefined()
      expect(result.data.payments[0].id).toBe(payment.id)
    })
  })
}
