import type { Config } from '/src'

export const configAutomationActionIntegrationPappersGetCompany: Config = {
  name: 'App with Pappers integration with GetCompany action',
  automations: [
    {
      name: 'getCompany',
      trigger: {
        service: 'Http',
        event: 'ApiCalled',
        path: 'get-company',
        output: {
          denomination: '{{getCompany.denomination}}',
        },
      },
      actions: [
        {
          name: 'getCompany',
          integration: 'Pappers',
          action: 'GetCompany',
          account: 'pappers',
          siret: '44306184100047',
        },
      ],
    },
  ],
}
