import type { Config } from '/src'

export const configIntegrationJotform: Config = {
  name: 'App with Jotform integration',
  integrations: {
    jotform: [
      {
        account: 'jotform_account',
        apiKey: 'jotform_api_key',
      },
    ],
  },
}
