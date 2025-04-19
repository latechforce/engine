import type { Config } from '/src'

export const configAutomationActionIntegrationGoCardlessListPayments: Config = {
  name: 'App with GoCardless integration with ListPayments action',
  automations: [
    {
      name: 'listPayments',
      trigger: {
        service: 'Http',
        event: 'ApiCalled',
        path: 'list-payments',
        output: {
          payments: { json: '{{listPayments.payments}}' },
          meta: { json: '{{listPayments.meta}}' },
        },
      },
      actions: [
        {
          name: 'listPayments',
          integration: 'GoCardless',
          action: 'ListPayments',
          account: 'gocardless',
          params: {
            limit: 10,
            status: 'pending_submission',
          },
        },
      ],
    },
  ],
}
