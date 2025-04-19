import type { Config } from '/src'

export const configIntegrationPhantombuster: Config = {
  name: 'App with Phantombuster integration',
  integrations: {
    phantombuster: [
      {
        account: 'phantombuster_account',
        apiKey: 'phantombuster_api_key',
      },
    ],
  },
}
