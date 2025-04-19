import Tester, { expect, describe, it, beforeEach } from 'bun:test'
import { Mock, type Config } from '/test/bun'
import {
  qontoCreateClientInvoiceSample,
  qontoCreateClientSample,
} from '/infrastructure/integrations/bun/mocks/qonto/QontoTestSamples'
import type { QontoClientInvoice } from '/domain/integrations/Qonto/QontoTypes'
import { configAutomationActionIntegrationQontoRetrieveAttachment } from '/examples/config/automation/action/integration/qonto/retrieveAttachment'

new Mock(Tester).app(({ app }) => {
  describe('on start', () => {
    it('should return a config error if the configuration is not valid', async () => {
      // GIVEN
      const extendConfig: Config = {
        ...configAutomationActionIntegrationQontoRetrieveAttachment,
        integrations: {
          qonto: [
            {
              account: 'qonto',
              baseUrl: ':memory:',
              organisationSlug: 'new-organization-slug',
              secretKey: 'invalid-secret-key',
            },
          ],
        },
      }

      // WHEN
      const call = async () => app.start(extendConfig)

      // THEN
      expect(call()).rejects.toThrow('Test connection failed')
    })
  })
})

new Mock(Tester, { integrations: ['Qonto'] }).request(({ app, request, integrations }) => {
  let invoice: QontoClientInvoice

  beforeEach(async () => {
    // GIVEN
    const { data: client } = await integrations.qonto.createClient(qontoCreateClientSample)
    if (!client) throw new Error('Client not created')
    await integrations.qonto.createClientInvoice(qontoCreateClientInvoiceSample(client))
    const { data: invoices = [] } = await integrations.qonto.listClientInvoices()
    invoice = invoices[0]
    if (!invoice) throw new Error('Invoice not created')
  })

  describe('on POST', () => {
    it('should retrieve an attachment', async () => {
      // GIVEN
      const config = {
        ...configAutomationActionIntegrationQontoRetrieveAttachment,
        automations: [
          {
            ...configAutomationActionIntegrationQontoRetrieveAttachment.automations![0],
            actions: [
              {
                ...configAutomationActionIntegrationQontoRetrieveAttachment.automations![0]
                  .actions[0],
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
