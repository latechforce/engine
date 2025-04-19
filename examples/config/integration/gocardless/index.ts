import type { Config } from '/src'

export const configIntegrationGocardless: Config = {
  name: 'App with Gocardless integration',
  integrations: {
    gocardless: [
      {
        account: 'gocardless_account',
        accessToken: 'gocardless_access_token',
      },
    ],
  },
}
