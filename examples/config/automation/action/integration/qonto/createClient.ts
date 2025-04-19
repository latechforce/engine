import type { Config } from '/src'

export const configAutomationActionIntegrationQontoCreateClient: Config = {
  name: 'App with Qonto integration with CreateClient action',
  automations: [
    {
      name: 'createClient',
      trigger: {
        service: 'Http',
        event: 'ApiCalled',
        path: 'create-client',
        output: {
          id: '{{createClient.id}}',
        },
      },
      actions: [
        {
          name: 'createClient',
          integration: 'Qonto',
          action: 'CreateClient',
          account: 'qonto',
          client: {
            name: 'John Doe',
            type: 'company',
            email: 'test@test.com',
            vat_number: 'FR12345678901',
            currency: 'EUR',
            locale: 'FR',
            address: '1 rue de Paris',
            city: 'Paris',
            zip_code: '75001',
            country_code: 'FR',
          },
        },
      ],
    },
  ],
}
