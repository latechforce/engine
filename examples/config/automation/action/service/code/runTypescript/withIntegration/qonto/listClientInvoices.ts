import type { Config, CodeRunnerContext } from '/src'

export const configAutomationActionServiceCodeRunTypescriptWithQontoListClientInvoicesIntegration: Config =
  {
    name: 'App with a run typescript action with a Qonto integration with list client invoices method',
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
              const clientInvoices = await qonto.listClientInvoices('qonto')
              return { clientInvoices }
            }),
          },
        ],
      },
    ],
  }
