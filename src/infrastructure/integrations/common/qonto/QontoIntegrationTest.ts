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

  describe('retrieveAttachment', () => {
    it('should retrieve an attachment', async () => {
      // GIVEN
      let attachmentId: string | undefined
      do {
        const [invoice] = await integration.listClientInvoices()
        attachmentId = invoice.attachment_id
      } while (!attachmentId)

      // WHEN
      const attachment = await integration.retrieveAttachment(attachmentId)

      // THEN
      expect(attachment?.id).toBe(attachmentId)
      expect(attachment?.file_content_type).toBe('application/pdf')
      expect(attachment?.url).toBeDefined()
    })

    it('should fetch an attachment as a buffer', async () => {
      // GIVEN
      let attachmentId: string | undefined
      do {
        const [invoice] = await integration.listClientInvoices()
        attachmentId = invoice.attachment_id
      } while (!attachmentId)

      // WHEN
      const attachment = await integration.retrieveAttachment(attachmentId)
      if (!attachment) {
        throw new Error('Attachment not found')
      }
      const buffer = await fetch(attachment.url).then((res) => res.arrayBuffer())

      // THEN
      expect(buffer).toBeDefined()
      expect(buffer).toBeInstanceOf(ArrayBuffer)
    })
  })
}
