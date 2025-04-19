import type { Config } from '/test/bun'
import type { CodeRunnerContext } from '/domain/services/CodeRunner'

export const configAutomationActionServiceCodeRunTypescriptWithGoCardlessListPaymentsIntegration: Config =
  {
    name: 'App with a run typescript action with a GoCardless integration with list payments method',
    automations: [
      {
        name: 'listPayments',
        trigger: {
          service: 'Http',
          event: 'ApiCalled',
          path: 'list-payments',
          output: {
            payments: { json: '{{runTypescriptCode.payments}}' },
            meta: { json: '{{runTypescriptCode.meta}}' },
          },
        },
        actions: [
          {
            service: 'Code',
            action: 'RunTypescript',
            name: 'runTypescriptCode',
            code: String(async function (context: CodeRunnerContext<{}>) {
              const { gocardless } = context.integrations

              const result = await gocardless.listPayments('gocardless', {
                limit: 10,
                status: 'pending_submission',
              })
              return result
            }),
          },
        ],
      },
    ],
  }
