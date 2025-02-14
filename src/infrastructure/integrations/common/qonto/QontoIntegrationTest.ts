import type { IQontoIntegration } from '/adapter/spi/integrations/QontoSpi'
import type { QontoClient } from '/domain/integrations/Qonto'
import type BunTester from 'bun:test'
import {
  qontoCreateClientInvoiceSample,
  qontoCreateClientSample,
} from '../../bun/mocks/qonto/QontoTestSamples'

export function testQontoIntegration(
  { describe, it, expect }: typeof BunTester,
  integration: IQontoIntegration
) {
  let client: QontoClient

  describe('createClient', () => {
    it('should create a client', async () => {
      // WHEN
      client = await integration.createClient(qontoCreateClientSample)

      // THEN
      expect(client?.id).toBeDefined()
    })
  })

  describe('createClientInvoice', () => {
    it('should create a client invoices', async () => {
      // GIVEN
      const createClientInvoice = qontoCreateClientInvoiceSample(client)

      // WHEN
      const invoice = await integration.createClientInvoice(createClientInvoice)

      // THEN
      expect(invoice?.id).toBeDefined()
    })
  })

  describe('listClientInvoices', () => {
    it('should list client invoices', async () => {
      // WHEN
      const invoices = await integration.listClientInvoices()

      // THEN
      expect(invoices.length > 0).toBeTruthy()
    })
  })
}
