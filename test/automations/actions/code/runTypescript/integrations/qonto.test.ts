import Tester, { expect, describe, it } from 'bun:test'
import { Helpers, type Config } from '/test/bun'
import type { CodeRunnerContext } from '/domain/services/CodeRunner'
import {
  qontoCreateClientInvoiceSample,
  qontoCreateClientSample,
} from '/infrastructure/integrations/bun/mocks/qonto/QontoTestSamples'
import type { QontoAttachment, QontoClient, QontoClientInvoice } from '/domain/integrations/Qonto'

const helpers = new Helpers(Tester)

helpers.testWithMockedApp({ integrations: ['Qonto'] }, ({ app, request, integrations }) => {
  describe('on POST', () => {
    it('should run a Typescript code with a Qonto create client', async () => {
      // GIVEN
      const config: Config = {
        name: 'App',
        version: '1.0.0',
        automations: [
          {
            name: 'createClient',
            trigger: {
              service: 'Http',
              event: 'ApiCalled',
              path: 'create-client',
              output: {
                client: {
                  json: '{{runJavascriptCode.client}}',
                },
              },
            },
            actions: [
              {
                service: 'Code',
                action: 'RunTypescript',
                name: 'runJavascriptCode',
                input: {
                  createClient: {
                    json: JSON.stringify(qontoCreateClientSample),
                  },
                },
                code: String(async function (
                  context: CodeRunnerContext<{ createClient: typeof qontoCreateClientSample }>
                ) {
                  const { qonto } = context.integrations
                  const { createClient } = context.inputData
                  const client = await qonto.createClient(createClient)
                  return { client }
                }),
              },
            ],
          },
        ],
      }
      const { url } = await app.start(config)

      // WHEN
      const response = await request.post<{ client: QontoClient }>(
        `${url}/api/automation/create-client`
      )

      // THEN
      expect(response.client.id).toBeDefined()
    })

    it('should run a Typescript code with a Qonto create client invoice', async () => {
      // GIVEN
      const client = await integrations.qonto.createClient(qontoCreateClientSample)
      const sample = qontoCreateClientInvoiceSample(client)
      const config: Config = {
        name: 'App',
        version: '1.0.0',
        automations: [
          {
            name: 'createClientInvoice',
            trigger: {
              service: 'Http',
              event: 'ApiCalled',
              path: 'create-client-invoice',
              output: {
                clientInvoice: {
                  json: '{{runJavascriptCode.clientInvoice}}',
                },
              },
            },
            actions: [
              {
                service: 'Code',
                action: 'RunTypescript',
                name: 'runJavascriptCode',
                input: {
                  createClientInvoice: {
                    json: JSON.stringify(sample),
                  },
                },
                code: String(async function (
                  context: CodeRunnerContext<{ createClientInvoice: typeof sample }>
                ) {
                  const { qonto } = context.integrations
                  const { createClientInvoice } = context.inputData
                  const clientInvoice = await qonto.createClientInvoice(createClientInvoice)
                  return { clientInvoice }
                }),
              },
            ],
          },
        ],
      }
      const { url } = await app.start(config)

      // WHEN
      const response = await request.post<{ clientInvoice: QontoClientInvoice }>(
        `${url}/api/automation/create-client-invoice`
      )

      // THEN
      expect(response.clientInvoice.id).toBeDefined()
    })

    it('should run a Typescript code with a Qonto list client invoices', async () => {
      // GIVEN
      const client = await integrations.qonto.createClient(qontoCreateClientSample)
      await integrations.qonto.createClientInvoice(qontoCreateClientInvoiceSample(client))
      const config: Config = {
        name: 'App',
        version: '1.0.0',
        automations: [
          {
            name: 'listClientInvoices',
            trigger: {
              service: 'Http',
              event: 'ApiCalled',
              path: 'list-client-invoices',
              output: {
                clientInvoices: {
                  json: '{{runJavascriptCode.clientInvoices}}',
                },
              },
            },
            actions: [
              {
                service: 'Code',
                action: 'RunTypescript',
                name: 'runJavascriptCode',
                code: String(async function (context: CodeRunnerContext) {
                  const { qonto } = context.integrations
                  const clientInvoices = await qonto.listClientInvoices()
                  return { clientInvoices }
                }),
              },
            ],
          },
        ],
      }
      const { url } = await app.start(config)

      // WHEN
      const response = await request.post<{ clientInvoices: QontoClientInvoice[] }>(
        `${url}/api/automation/list-client-invoices`
      )

      // THEN
      expect(response.clientInvoices).toHaveLength(1)
    })

    it('should run a Typescript code with a Qonto retrieve attachment', async () => {
      // GIVEN
      const client = await integrations.qonto.createClient(qontoCreateClientSample)
      await integrations.qonto.createClientInvoice(qontoCreateClientInvoiceSample(client))
      const [invoice] = await integrations.qonto.listClientInvoices()
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
                  json: '{{runJavascriptCode.attachment}}',
                },
              },
            },
            actions: [
              {
                service: 'Code',
                action: 'RunTypescript',
                name: 'runJavascriptCode',
                input: {
                  attachmentId: invoice.attachment_id!,
                },
                code: String(async function (context: CodeRunnerContext<{ attachmentId: string }>) {
                  const { qonto } = context.integrations
                  const { attachmentId } = context.inputData
                  const attachment = await qonto.retrieveAttachment(attachmentId)
                  return { attachment }
                }),
              },
            ],
          },
        ],
      }
      const { url } = await app.start(config)

      // WHEN
      const response = await request.post<{ attachment: QontoAttachment }>(
        `${url}/api/automation/retrieve-attachment`
      )

      // THEN
      expect(response.attachment.id).toBe(invoice.attachment_id!)
      expect(response.attachment.file_name).toContain('invoice')
      expect(response.attachment.file_content_type).toBe('application/pdf')
      expect(response.attachment.url).toBeDefined()
    })
  })
})
