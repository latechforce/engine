import Tester, { expect, describe, it } from 'bun:test'
import { Mock } from '/test/bun'
import {
  qontoCreateClientInvoiceSample,
  qontoCreateClientSample,
} from '/infrastructure/integrations/bun/mocks/qonto/QontoTestSamples'
import type {
  QontoAttachment,
  QontoClient,
  QontoClientInvoice,
} from '/domain/integrations/Qonto/QontoTypes'
import { configAutomationActionServiceCodeRunTypescriptWithQontoCreateClientIntegration } from '/examples/config/automation/action/service/code/runTypescript/withIntegration/qonto/createClient'
import { configAutomationActionServiceCodeRunTypescriptWithQontoCreateClientInvoiceIntegration } from '/examples/config/automation/action/service/code/runTypescript/withIntegration/qonto/createClientInvoice'
import { configAutomationActionServiceCodeRunTypescriptWithQontoListClientInvoicesIntegration } from '/examples/config/automation/action/service/code/runTypescript/withIntegration/qonto/listClientInvoices'
import { configAutomationActionServiceCodeRunTypescriptWithQontoRetrieveAttachmentIntegration } from '/examples/config/automation/action/service/code/runTypescript/withIntegration/qonto/retrieveAttachment'

const mock = new Mock(Tester, { integrations: ['Qonto'] })

mock.request(({ app, request, integrations }) => {
  describe('on POST', () => {
    it('should run a Typescript code with a Qonto create client', async () => {
      // GIVEN
      const { url } = await app.start(
        configAutomationActionServiceCodeRunTypescriptWithQontoCreateClientIntegration
      )

      // WHEN
      const response = await request.post<{ client: QontoClient }>(
        `${url}/api/automation/create-client`,
        {
          createClient: JSON.stringify(qontoCreateClientSample),
        }
      )

      // THEN
      expect(response.client.id).toBeDefined()
    })

    it('should run a Typescript code with a Qonto create client invoice', async () => {
      // GIVEN
      const { data: client } = await integrations.qonto.createClient(qontoCreateClientSample)
      if (!client) throw new Error('Client not created')
      const sample = qontoCreateClientInvoiceSample(client)
      const { url } = await app.start(
        configAutomationActionServiceCodeRunTypescriptWithQontoCreateClientInvoiceIntegration
      )

      // WHEN
      const response = await request.post<{ clientInvoice: QontoClientInvoice }>(
        `${url}/api/automation/create-client-invoice`,
        {
          createClientInvoice: JSON.stringify(sample),
        }
      )

      // THEN
      expect(response.clientInvoice.id).toBeDefined()
    })

    it('should run a Typescript code with a Qonto list client invoices', async () => {
      // GIVEN
      const { data: client } = await integrations.qonto.createClient(qontoCreateClientSample)
      if (!client) throw new Error('Client not created')
      await integrations.qonto.createClientInvoice(qontoCreateClientInvoiceSample(client))
      const { url } = await app.start(
        configAutomationActionServiceCodeRunTypescriptWithQontoListClientInvoicesIntegration
      )

      // WHEN
      const response = await request.post<{ clientInvoices: QontoClientInvoice[] }>(
        `${url}/api/automation/list-client-invoices`
      )

      // THEN
      expect(response.clientInvoices).toHaveLength(1)
    })

    it('should run a Typescript code with a Qonto retrieve attachment', async () => {
      // GIVEN
      const { data: client } = await integrations.qonto.createClient(qontoCreateClientSample)
      if (!client) throw new Error('Client not created')
      await integrations.qonto.createClientInvoice(qontoCreateClientInvoiceSample(client))
      const { data: invoices = [] } = await integrations.qonto.listClientInvoices()
      const invoice = invoices[0]
      if (!invoice) throw new Error('Invoice not created')
      const { url } = await app.start(
        configAutomationActionServiceCodeRunTypescriptWithQontoRetrieveAttachmentIntegration
      )

      // WHEN
      const response = await request.post<{ attachment: QontoAttachment }>(
        `${url}/api/automation/retrieve-attachment`,
        {
          attachmentId: invoice.attachment_id!,
        }
      )

      // THEN
      expect(response.attachment.id).toBe(invoice.attachment_id!)
      expect(response.attachment.file_name).toContain('invoice')
      expect(response.attachment.file_content_type).toBe('application/pdf')
      expect(response.attachment.url).toBeDefined()
    })
  })
})
