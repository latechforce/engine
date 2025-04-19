import type { Config, CodeRunnerContext } from '/src'

export const configAutomationActionServiceCodeRunTypescriptWithQontoCreateClientInvoiceIntegration: Config =
  {
    name: 'App with a run typescript action with a Qonto integration with create client invoice method',
    automations: [
      {
        name: 'createClientInvoice',
        trigger: {
          service: 'Http',
          event: 'ApiCalled',
          path: 'create-client-invoice',
          input: {
            type: 'object',
            properties: {
              createClientInvoice: {
                type: 'string',
              },
            },
          },
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
              createClientInvoice: '{{trigger.body.createClientInvoice}}',
            },
            code: String(async function (
              context: CodeRunnerContext<{
                createClientInvoice: string
              }>
            ) {
              const { qonto } = context.integrations
              const { createClientInvoice } = context.inputData
              const clientInvoice = await qonto.createClientInvoice(
                'qonto',
                JSON.parse(createClientInvoice)
              )
              return { clientInvoice }
            }),
          },
        ],
      },
    ],
  }
