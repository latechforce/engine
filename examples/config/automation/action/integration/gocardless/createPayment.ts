import type { Config } from '/src'

export const configAutomationActionIntegrationGoCardlessCreatePayment: Config = {
  name: 'App with GoCardless integration with CreatePayment action',
  automations: [
    {
      name: 'createPayment',
      trigger: {
        service: 'Http',
        event: 'ApiCalled',
        path: 'create-payment',
        output: {
          id: '{{createPayment.id}}',
        },
      },
      actions: [
        {
          name: 'createPayment',
          integration: 'GoCardless',
          action: 'CreatePayment',
          account: 'gocardless',
          payment: {
            amount: 1000,
            currency: 'EUR',
            description: 'Test payment',
            mandate: 'MD123',
            charge_date: '2025-01-01',
            retry_if_possible: true,
          },
        },
      ],
    },
  ],
}
