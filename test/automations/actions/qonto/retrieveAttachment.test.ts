import Tester, { expect, describe, it } from 'bun:test'
import { Mock, type Config } from '/test/bun'
import {
  qontoCreateClientInvoiceSample,
  qontoCreateClientSample,
} from '/infrastructure/integrations/bun/mocks/qonto/QontoTestSamples'

const mock = new Mock(Tester, { integrations: ['Qonto'] })

mock.request(({ app, request, integrations }) => {
  describe('on POST', () => {
    it('should retrieve an attachment', async () => {
      // GIVEN
      const { data: client } = await integrations.qonto.createClient(qontoCreateClientSample)
      if (!client) throw new Error('Client not created')
      await integrations.qonto.createClientInvoice(qontoCreateClientInvoiceSample(client))
      const { data: invoices = [] } = await integrations.qonto.listClientInvoices()
      const invoice = invoices[0]
      if (!invoice) throw new Error('Invoice not created')
      const config: Config = {
        name: 'App',
        version: '1.0.0',
        automations: [
          {
            name: 'retrieveAttachment',
            trigger: {
              service: 'Http',
              event: 'ApiCalled',
              path: 'retrieve-attachment',
              output: {
                attachment: {
                  json: '{{retrieveAttachment}}',
                },
              },
            },
            actions: [
              {
                name: 'retrieveAttachment',
                integration: 'Qonto',
                action: 'RetrieveAttachment',
                attachmentId: invoice.attachment_id!,
              },
            ],
          },
        ],
      }
      const { url } = await app.start(config)

      // WHEN
      const response = await request.post(`${url}/api/automation/retrieve-attachment`)

      // THEN
      expect(response.attachment.id).toBe(invoice.attachment_id)
      expect(response.attachment.file_name).toContain('invoice')
      expect(response.attachment.file_content_type).toBe('application/pdf')
      expect(response.attachment.url).toBeDefined()
    })
  })
})
