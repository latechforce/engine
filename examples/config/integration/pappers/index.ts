import type { Config } from '/src'

export const configIntegrationPappers: Config = {
  name: 'App with Pappers integration',
  integrations: {
    pappers: [
      {
        account: 'pappers_account',
        apiKey: 'pappers_api_key',
      },
    ],
  },
}
