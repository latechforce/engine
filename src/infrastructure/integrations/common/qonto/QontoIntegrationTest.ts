import type { IQontoIntegration } from '/adapter/spi/integrations/QontoSpi'
import type { QontoClient } from '/domain/integrations/Qonto/QontoTypes'
import type BunTester from 'bun:test'
import {
  qontoCreateClientInvoiceSample,
  qontoCreateClientSample,
} from '../../bun/mocks/qonto/QontoTestSamples'

export function testQontoIntegration(
  { describe, it, expect }: typeof BunTester,
  integration: IQontoIntegration
) {
  let client: QontoClient | undefined

  describe('testConnection', () => {
    it('should test connection', async () => {
      // WHEN
      const result = await integration.testConnection()

      // THEN
      expect(result).toBeUndefined()
    })
  })

  describe('createClient', () => {
    it('should create a client', async () => {
      // WHEN
      const response = await integration.createClient(qontoCreateClientSample)
      client = response.data

      // THEN
      expect(client?.id).toBeDefined()
    })
  })

  describe('createClientInvoice', () => {
    it('should create a client invoices', async () => {
      // GIVEN
      if (!client) {
        throw new Error('Client not found')
      }
      const createClientInvoice = qontoCreateClientInvoiceSample(client)

      // WHEN
      const { data: invoice } = await integration.createClientInvoice(createClientInvoice)

      // THEN
      expect(invoice?.id).toBeDefined()
    })
  })

  describe('listClientInvoices', () => {
    it('should list client invoices', async () => {
      // WHEN
      const { data: invoices = [] } = await integration.listClientInvoices()

      // THEN
      expect(invoices.length > 0).toBeTruthy()
    })
  })

  describe('retrieveAttachment', () => {
    it('should retrieve an attachment', async () => {
      // GIVEN
      let attachmentId: string | undefined
      do {
        const { data: invoices = [] } = await integration.listClientInvoices()
        attachmentId = invoices.find((invoice) => invoice.attachment_id)?.attachment_id
        if (!attachmentId) {
          await new Promise((resolve) => setTimeout(resolve, 500))
        }
      } while (!attachmentId)

      // WHEN
      const { data: attachment } = await integration.retrieveAttachment(attachmentId)

      // THEN
      expect(attachment?.id).toBe(attachmentId)
      expect(attachment?.file_content_type).toBe('application/pdf')
      expect(attachment?.url).toBeDefined()
    })

    it('should fetch an attachment url and return a pdf', async () => {
      // GIVEN
      let attachmentId: string | undefined
      do {
        const { data: invoices = [] } = await integration.listClientInvoices()
        attachmentId = invoices.find((invoice) => invoice.attachment_id)?.attachment_id
        if (!attachmentId) {
          await new Promise((resolve) => setTimeout(resolve, 500))
        }
      } while (!attachmentId)

      // WHEN
      const { data: attachment } = await integration.retrieveAttachment(attachmentId)
      if (!attachment) {
        throw new Error('Attachment not found')
      }
      const response = await fetch(attachment.url)

      // THEN
      expect(response.ok).toBeTruthy()
      const contentType = response.headers.get('content-type')
      expect(contentType).toBe('application/pdf')
    })
  })
}
